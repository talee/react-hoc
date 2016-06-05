import React from 'react'

import Renderable from './Renderable'
// Goals
// - Do not unmount templates unless rendering a new template in the same place
// - Given views, render them into a template
// - Allow communication between views per template
// - One render per data requirements received. No nested renders triggered.

const debugViews = {A, B}
function A(props) {
  return React.createElement('h1', null, 'View A')
}
function B(props) {
  return React.createElement('h1', null, 'View B')
}

export default class ReactHOC {
  constructor(options) {
    if (typeof options.renderer.render !== 'function') {
      throw new Error('ReactHOC: renderer.render must be a function')
    }
    this.renderer = options.renderer
  }

  /**
   * Waits for 'ready' event after calling the given load function, otherwise
   * if no load function is given, immediately render the component.
   * @param {object} props 
   * Must have the properties:
   * container, component
   *
   * Optional:
   * componentProps, load
   */
  load(props) {
    const renderable = new Renderable(props)
    renderable.on('ready', () => this.render(renderable))
    if (typeof renderable.load == 'function') {
      renderable.load()
    } else {
      this.render(renderable)
    }
  }

  render(renderable) {
    this.renderer.render(renderable.component, renderable.componentProps,
      renderable.container)
  }
}

// Temporarily export for testing
if (typeof self !== 'undefined') {
  self.ReactHOC = ReactHOC
}
