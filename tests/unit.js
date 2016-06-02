import ReactDOM from 'react-dom'
import should from 'should'
import {spy} from 'sinon'
import 'should-sinon'

import ReactHOC from '../src/ReactHOC'
import Renderable from '../src/Renderable'

const expect = should

class StubRenderer {
  static render(component, componentProps, container) {
    if (!component || !componentProps || !container) {
      throw new Error('StubRenderer: all arguments must be defined')
    }
  }
}

describe('ReactHOC', function() {
  it('should have a default class export', () => {
    ReactHOC.should.be.a.Function()
  })

  it('should load renderables', () => {
    const hoc = new ReactHOC({renderer: StubRenderer})

    const component = {a: 1}
    const componentProps = {b: 2}
    const container = {c: 3}
    const load = function() {this.emit('ready')}
    hoc.render = spy(hoc.render)
    hoc.load({component, componentProps, container, load})
    hoc.render.should.be.calledOnce()
  })
})
