import { CodeViewer } from './CodeViewer';
import ReactDOM from 'react-dom';
import React from 'react';

let modalParent = null

/**
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
 * Usage:
 * 
 * @param {*} event onClick event
 */
export function open(event, domNode) {
  event.preventDefault()
  if (!modalParent) {
    initialize("show-code-examples-modal")
  }
  const url = domNode.getAttribute("href")
  ReactDOM.render(<CodeViewer url={url} clickEvent={event} />,
    modalParent);

  return false
};

