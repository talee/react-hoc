import should from 'should'
import {spy} from 'sinon'
import 'should-sinon'

import ReactDOM from 'react-dom'
import {EventEmitter2} from 'eventemitter2'

import ReactHOC from '../src/ReactHOC'
import Renderable from '../src/Renderable'

const expect = should

class StubRenderer {
  static createElement(type, props, children) {
    return {type, props: {children, ...props}}
  }
  static render(Component, componentProps, container) {
    if (!Component || !componentProps || !container) {
      throw new Error('StubRenderer: all arguments must be defined')
    }
    // For testing purposes, children will be a single child
    let child = componentProps.children
    while (child) {
      let ref = new child.type(child.props)
      ref.render()
      child = child.props ? child.props.children : null
    }
    const component = new Component(componentProps)
    component.render()
  }
}

class StubDataRequirer extends EventEmitter2 {
  render() {
    // Emulate request for props (empty props response)
    setTimeout(() => this.emit('ready', {}), 0)
  }
}

class StubComponent {
  render() {
  }
}

class StubDOMNode {}

describe('ReactHOC', function() {
  it('should have a default class export', () => {
    ReactHOC.should.be.a.Function()
  })

  let hoc
  let renderableProps
  beforeEach(() => {
    hoc = new ReactHOC({renderer: StubRenderer})
    const component = StubComponent
    const componentProps = {children: {type: StubComponent}}
    const container = new StubDOMNode()
    const load = function() {this.emit('ready')}
    renderableProps = {component, componentProps, container, load}
  })

  it('should load renderables', () => {
    hoc.render = spy(hoc.render)
    hoc.load(renderableProps)
    hoc.render.should.be.calledOnce()
  })

  it('should render immediately if no load property is given', () => {
    hoc.render = spy(hoc.render)
    let {load, ...props} = renderableProps
    props.should.not.have.property('load')
    hoc.load(props)
    hoc.render.should.be.calledOnce()
  })
})
