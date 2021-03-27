import { CodeViewer } from './CodeViewer';
import ReactDOM from 'react-dom';
import React from 'react';

let modalParent = null
const modalParentID = "show-code-examples-modal"

/**
 * initialize get the element by ID to use for the modal item. if it's not called by the user, defaults to the value of `modalParentID`.
 * 
 * @param {*} id id of the element that acts as a wrapper for modal container
 */
export function initialize(id) {
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
  ReactDOM.render(<CodeViewer url={url} clickEvent={event} />,
    modalParent);

  return false
};

