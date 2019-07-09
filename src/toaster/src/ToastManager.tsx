import * as React from 'react'
import { css } from '@emotion/core'
import { StackingOrder } from '../../constants'
import Toast, { ToastProps } from './Toast'
import { ThemeContext } from '../../theme/index'
import Box from '@parishconnect/box'

const wrapperClass = ({ position = 'center' }) =>
  css({
    maxWidth: 560,
    marginLeft: position === 'center' || position === 'right' ? 'auto' : 0,
    marginRight: position === 'center' || position === 'left' ? 'auto' : 0,
    top: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    zIndex: StackingOrder.TOASTER,
    pointerEvents: 'none'
  })

const hasCustomId = (settings: any) =>
  Object.hasOwnProperty.call(settings, 'id')

export interface ToastManagerProps extends Partial<ToastProps> {
  /**
   * Function called with the `this.notify` function.
   */
  bindNotify?: any

  /**
   * Function called with the `this.getToasts` function.
   */
  bindGetToasts?: any

  /**
   * Function called with the `this.closeAll` function.
   */
  bindCloseAll?: any

  /**
   * Sets the position of the toast
   */
  position?: 'center' | 'left' | 'right'
}

interface ToastManagerState {
  toasts: any[]
}

export default class ToastManager extends React.PureComponent<
  ToastManagerProps,
  ToastManagerState
> {
  static idCounter = 0
  static contextType = ThemeContext

  constructor(props: ToastManagerProps) {
    super(props)

    props.bindNotify(this.notify)
    props.bindGetToasts(this.getToasts)
    props.bindCloseAll(this.closeAll)

    this.state = {
      toasts: []
    }
  }

  getToasts = () => {
    return this.state.toasts
  }

  closeAll = () => {
    this.getToasts().forEach(toast => toast.close())
  }

  notify = (title: any, settings: any) => {
    // If there's a custom toast ID passed, close existing toasts with the same custom ID
    if (hasCustomId(settings)) {
      for (const toast of this.state.toasts) {
        // Since unique ID is still appended to a custom ID, skip the unique ID and check only prefix
        if (String(toast.id).startsWith(settings.id)) {
          this.closeToast(toast.id)
        }
      }
    }

    const instance = this.createToastInstance(title, settings)

    this.setState(previousState => {
      return {
        toasts: [instance, ...previousState.toasts]
      }
    })

    return instance
  }

  createToastInstance = (
    title: string,
    settings: {
      id: string
      description: React.ReactChild
      hasCloseButton: boolean
      duration: number
      intent: string
    }
  ) => {
    const uniqueId = ++ToastManager.idCounter
    const id = hasCustomId(settings) ? `${settings.id}-${uniqueId}` : uniqueId

    return {
      id,
      title,
      description: settings.description,
      hasCloseButton: settings.hasCloseButton || true,
      duration: settings.duration || 5,
      close: () => this.closeToast(id),
      intent: settings.intent
    }
  }

  /**
   * This will set isShown on the Toast which will close the toast.
   * It won't remove the toast until onExited triggers onRemove.
   */
  closeToast = (id: any) => {
    this.setState(previousState => {
      return {
        toasts: previousState.toasts.map(toast => {
          if (toast.id === id) {
            return {
              ...toast,
              isShown: false
            }
          }
          return toast
        })
      }
    })
  }

  removeToast = (id: any) => {
    this.setState(previousState => {
      return {
        toasts: previousState.toasts.filter(toast => toast.id !== id)
      }
    })
  }

  render() {
    return (
      <Box
        is="span"
        css={wrapperClass({ position: this.context.toasterPosition }) as any}
      >
        {this.state.toasts.map(({ id, description, ...props }) => {
          return (
            <Toast
              key={id}
              onRemove={() => this.removeToast(id)}
              {...(props as any)}
            >
              {description}
            </Toast>
          )
        })}
      </Box>
    )
  }
}
