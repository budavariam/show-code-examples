
import React, { useReducer, useEffect, useRef, useState, Suspense } from "react"
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
    console.warn("Failed to get file extension from url", url, err)
    return null
  }
}

const COPY_STATES = { IDLE: "idle", COPYING: "copying", COPIED: "copied" }
const COPY_LABELS = { [COPY_STATES.IDLE]: "Copy", [COPY_STATES.COPYING]: "Copying", [COPY_STATES.COPIED]: "Copied" }

function writeToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }
  // Legacy fallback: execCommand (IE11, older Safari/Firefox)
  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none"
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(textarea)
    return ok ? Promise.resolve() : Promise.reject(new Error("execCommand copy failed"))
  } catch (err) {
    return Promise.reject(err)
  }
}

function CopyButton({ code }) {
  const [copyState, setCopyState] = useState(COPY_STATES.IDLE)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  function handleCopy(e) {
    e.stopPropagation()
    setCopyState(COPY_STATES.COPYING)
    writeToClipboard(code)
      .then(() => {
        setCopyState(COPY_STATES.COPIED)
        timerRef.current = setTimeout(() => setCopyState(COPY_STATES.IDLE), 2500)
      })
      .catch(() => setCopyState(COPY_STATES.IDLE))
  }

  return (
    <button className="sce-copy-btn hljs-comment" onClick={handleCopy}>
      {COPY_LABELS[copyState]}
    </button>
  )
}

function CodeModal({ url, language, code, isFullScreenContainer, dispatch, copyButton }) {
  try {
    const classNames = `sce-modal hljs ${!isFullScreenContainer ? "sce-embedded" : ""}`
    return (
      <div className={classNames} onDoubleClick={() => { dispatch({ type: actions.CLOSE_MODAL }) }}>
        <div className="sce-modal-top">
          <a className="hljs-comment" href={url} target="_blank">{url}</a>
          {copyButton && <CopyButton code={code} />}
        </div>
        <pre>
          <Suspense fallback={null}>
            <CodeHighlight language={language} code={code} />
          </Suspense>
        </pre>
        <div
          className="sce-modal-bottom hljs-comment"
          onClick={() => { dispatch({ type: actions.CLOSE_MODAL }) }}
        >
          <span className="sce-close-touch">... Tap HERE to close ...</span>
          <span className="sce-close-pointer">... Double-click anywhere or click HERE to close ...</span>
        </div>
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
      return state
    }
  }
}

export function CodeViewer({ clickEvent, url, isFullScreenContainer, copyButton }) {
  const [state, dispatch] = useReducer(reducer, {}, () => ({
    code: "",
    language: null,
    hasData: false,
    isOpen: false,
    errorMessage: null,
  }))
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

  useEffect(() => {
    document.body.classList.remove("sce-noscroll")
    if (state.isOpen && isFullScreenContainer) {
      document.body.classList.add("sce-noscroll")
    }
  }, [state.isOpen, isFullScreenContainer])

  return state.isOpen && state.hasData
    ? <CodeModal language={state.language} code={state.code} url={url} dispatch={dispatch} isFullScreenContainer={isFullScreenContainer} copyButton={copyButton} />
    : null
}
