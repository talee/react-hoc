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

  load(props) {
    const renderable = new Renderable(props)
    renderable.on('ready', () => this.render(renderable))
    renderable.load()
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
