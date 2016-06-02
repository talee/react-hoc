import {EventEmitter2} from 'eventemitter2'

export default class Renderable extends EventEmitter2 {
  constructor(props) {
    super()
    this.container = props.container
    this.component = props.component
    this.componentProps = props.componentProps
    this.load = props.load
  }
}
