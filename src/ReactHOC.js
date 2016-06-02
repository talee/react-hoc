import React from 'react'
import ReactDOM from 'react-dom'

export default class ReactHOC {
  constructor() {
    if (typeof document !== 'undefined') {
      const container = document.querySelector('#container')
      ReactDOM.render(React.createElement('h1', null, 'Hello!'), container)
    }
  }
}

new ReactHOC()
