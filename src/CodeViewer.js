
import React, { useReducer, useEffect, Suspense } from "react"
import "./CodeViewer.css"
const CodeHighlight = React.lazy(() => import('./codeHighlight'));

let cache = {}

const actions = {
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODAL: "OPEN_MODAL",
  SET_ERROR: "SET_ERROR",
}


function getLanguageFromUrl(url) {
  try {
    return new URL(url, window.location.href).pathname.split('/').pop().split('.').pop();
  } catch (err) {
    console.warning("Failed to get file extension from url", url, err)
    return null
  }
}

function CodeModal({ url, language, code, dispatch }) {
  try {
    return (
      <div className="sce-modal hljs" onDoubleClick={() => { dispatch({ type: actions.CLOSE_MODAL }) }}>
        <div className="sce-modal-top"><a className="hljs-comment" href={url} target="_blank">{url}</a></div>
        <pre>
          <Suspense fallback={null}>
            <CodeHighlight language={language} code={code} />
          </Suspense>
        </pre>
        <div className="sce-modal-bottom hljs-comment">... Double-Click to close ...</div>
      </div>
    )
  } catch (err) {
    console.error("Failed to parse", err)
    return null
  }
}

const reducer = (state, action) => {
  if (!action || !action.type) {
    return state
  }
  switch (action.type) {
    case actions.OPEN_MODAL: {
      return {
        ...state,
        isOpen: true,
        hasData: true,
        language: action.language,
        code: action.code
      }
    }
    case actions.CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
      }
    }
    case actions.SET_ERROR: {
      return {
        ...state,
        isOpen: false,
        errorMessage: action.error,
        hasData: false,
      }
    }
    default: {
      console.warn("Unhandled action", action)
    }
  }
}

export function CodeViewer({ clickEvent, url }) {
  const [state, dispatch] = useReducer(reducer, {}, () => ({
    code: "",
    language: null,
    hasData: false,
    isOpen: false,
    errorMessage: null,
  }))
  console.debug("Opened code viewer", url, state)

  useEffect(() => {
    if (url in cache) {
      dispatch({
        type: actions.OPEN_MODAL,
        code: cache[url],
        language: getLanguageFromUrl(url)
      })
    } else {
      fetch(url)
        .then(response => response.text())
        .then(text => {
          cache[url] = text;
          return text;
        })
        .then(result => dispatch({
          type: actions.OPEN_MODAL,
          code: result,
          language: getLanguageFromUrl(url)
        }))
        .catch(error => {
          console.error(error);
          dispatch({
            type: actions.SET_ERROR,
            error: error
          })
        });
    }
  }, [url, clickEvent])

  return state.isOpen && state.hasData
    ? <CodeModal language={state.language} code={state.code} url={url} dispatch={dispatch} />
    : null
}
