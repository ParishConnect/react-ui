import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { canUseDOM } from 'exenv'

let portalContainer: HTMLElement

export default class Portal extends React.Component {
  el: HTMLElement
  constructor(props: any) {
    super(props)

    // This fixes SSR
    if (!canUseDOM) {
      return
    }

    if (!portalContainer) {
      portalContainer = document.createElement('div')
      portalContainer.setAttribute('parishconnect-portal-container', '')
      document.body.appendChild(portalContainer)
    }

    this.el = document.createElement('div')
    portalContainer.appendChild(this.el)
  }

  componentWillUnmount() {
    portalContainer.removeChild(this.el)
  }

  render(): any {
    // This fixes SSR
    if (!canUseDOM) {
      return null
    }
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
