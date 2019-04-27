import * as React from 'react'
import ReactDOM from 'react-dom'
import ToastManager from './ToastManager'

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

interface ToasterSettings {
  /**
   * A description is used as the children of the Alert component. The description can be a React node.
   */
  description?: React.ReactChild
  /**
   * Passing a unique ID via id property allows Aluminum to close all previous toasts with the same ID, before showing a new one.
   */
  id?: string
  /**
   * It is possible to add a custom duration when showing a toast. The duration property is in seconds — not milliseconds.
   * @default 5
   */
  duration?: number
}

interface ToasterProps {
  getToasts?: () => void
  closeAll?: () => void
  notify?: (title: any, settings: ToasterSettings) => void
  success?: (title: any, settings: ToasterSettings) => void
  warning?: (title: any, settings: ToasterSettings) => void
  danger?: (title: any, settings: ToasterSettings) => void
}

/**
 * The Toaster manages the interactionsb between
 * the ToasterManger and the toast API.
 */
export default class Toaster implements ToasterProps {
  notifyHandler: any
  getToastsHandler: any
  closeAllHandler: any
  constructor() {
    if (!isBrowser) {
      return
    }

    const container = document.createElement('div')
    container.setAttribute('data-parishkit-toaster-container', '')
    document.body.appendChild(container)

    ReactDOM.render(
      <ToastManager
        bindNotify={this._bindNotify}
        bindGetToasts={this._bindGetToasts}
        bindCloseAll={this._bindCloseAll}
      />,
      container
    )
  }

  // tslint:disable:variable-name
  _bindNotify = (handler: any) => {
    this.notifyHandler = handler
  }

  _bindGetToasts = (handler: any) => {
    this.getToastsHandler = handler
  }

  _bindCloseAll = (handler: any) => {
    this.closeAllHandler = handler
  }

  getToasts = () => {
    return this.getToastsHandler()
  }

  closeAll = () => {
    return this.closeAllHandler()
  }

  notify = (title: any, settings: ToasterSettings = {}) => {
    return this.notifyHandler(title, { ...settings, intent: 'none' })
  }

  success = (title: any, settings: ToasterSettings = {}) => {
    return this.notifyHandler(title, { ...settings, intent: 'success' })
  }

  warning = (title: any, settings: ToasterSettings = {}) => {
    return this.notifyHandler(title, { ...settings, intent: 'warning' })
  }

  danger = (title: any, settings: ToasterSettings = {}) => {
    return this.notifyHandler(title, { ...settings, intent: 'danger' })
  }
}
