import should from 'should'
import {spy} from 'sinon'
import 'should-sinon'

import ReactHOC from '../src/ReactHOC'

const expect = should

describe('ReactHOC', function() {
  it('should have a default class export', () => {
    ReactHOC.should.be.a.Function()
  })
})
