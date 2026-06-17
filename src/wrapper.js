import { CodeViewer, preloadCache } from './CodeViewer';
import ReactDOM from 'react-dom';
import React from 'react';

let modalParent = null
const modalParentID = "show-code-examples-modal"
const DEFAULT_OPTIONS = { copyButton: false, selectOnCmdA: false, opacity: 98 }
let globalOptions = { ...DEFAULT_OPTIONS }

export const getDefaultModalParentID = () => {
  return modalParentID
}

/**
 * initialize get the element by ID to use for the modal item. if it's not called by the user, defaults to the value of `modalParentID`.
 *
 * @param {*} id id of the element that acts as a wrapper for modal container
 * @param {*} options optional configuration object (e.g. { copyButton: true })
 */
export function initialize(id, options = {}) {
  globalOptions = { ...DEFAULT_OPTIONS, ...options }
  const node = document.getElementById(id)
  if (!node) {
    const newNode = document.createElement("div")
    newNode.id = id
    document.body.appendChild(newNode)
    modalParent = newNode
    return
  }

  modalParent = node
}

/**
 * Opens the modal component with the code highlighter without downloading the referenced file
 *
 * @param {*} event onClick event
 */
export function open(event, domNode) {
  event.preventDefault()
  if (!modalParent) {
    initialize(modalParentID)
  }
  const url = domNode.getAttribute("href")
  const isFullScreenContainer = modalParent.id === modalParentID
  ReactDOM.render(
    <CodeViewer url={url} clickEvent={event} isFullScreenContainer={isFullScreenContainer} copyButton={globalOptions.copyButton} selectOnCmdA={globalOptions.selectOnCmdA} opacity={globalOptions.opacity} />,
    modalParent
  );

  return false
};

export { preloadCache };
