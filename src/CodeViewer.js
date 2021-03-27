
import React, { useReducer, useEffect } from "react"
import { highlight } from "highlight.js"
import "./CodeViewer.css"

let cache = {}

const actions = {
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODAL: "OPEN_MODAL",
  SET_ERROR: "SET_ERROR",
}

function compiletext(text) {
  const options = { language: "bash", ignoreIllegals: true }
  const result = highlight(text, options); // use the same highlight as the revealjs module

  ////////// MARKDOWNIT
  // var md = window.markdownit();
  // var result = md.render("```bash\n" + text + "\n```");
  //////////
  return result.value
}

function getLanguageFromUrl(url) {
  return "bash"
}

function CodeModal({ url, language, code, dispatch }) {
  try {
    return (
      <div className="sce-modal hljs" onDoubleClick={() => { dispatch({ type: actions.CLOSE_MODAL }) }}>
        <a className="sce-modal-top hljs-comment" href={url} target="_blank">{url}</a>
        <pre>
          <code
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: compiletext(code) }}
          />
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

export function CodeViewer({ url }) {
  const [state, dispatch] = useReducer(reducer, {}, () => ({
    code: "",
    language: "bash",
    hasData: false,
    isOpen: false,
    errorMessage: null,
  }))
  console.debug("Opened code viewer", url)

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
  }, [url])

  return state.isOpen && state.hasData
    ? <CodeModal language={state.language} code={state.code} url={url} dispatch={dispatch} />
    : null
}
