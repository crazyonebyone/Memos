import * as React from 'react'
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('Modal')
class ModalContainer extends React.Component<any> {
	private el: HTMLDivElement
	constructor(props: any) {
	  super(props)
	  this.el = document.createElement('div')
	}
	componentDidMount() {
	  modalRoot.appendChild(this.el)
	}
	componentWillUnmount() {
	  modalRoot.removeChild(this.el)
	}
	render() {
	  return createPortal(
		this.props.children,
		this.el
	  )
	}
  }

  export default ModalContainer