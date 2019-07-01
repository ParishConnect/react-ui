import * as React from 'react'
import { keyframes } from 'emotion'
import Transition from 'react-transition-group/Transition'
import { noop } from 'lodash'
import { Pane, Card, PaneProps } from '../../layers'
import { Portal } from '../../portal'
import { Paragraph, Heading } from '../../typography'
import { Button, IconButton } from '../../buttons'
import { IntentType } from '../../constants'
import { XIcon } from '../../icons/index'

const animationEasing = {
  deceleration: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
  acceleration: `cubic-bezier(0.4, 0.0, 1, 1)`,
  spring: `cubic-bezier(0.175, 0.885, 0.320, 1.175)`
}

const ANIMATION_DURATION = 240

const openAnimation = keyframes({
  from: {
    transform: 'translateY(100%)'
  },
  to: {
    transform: 'translateY(0)'
  }
})

const closeAnimation = keyframes({
  from: {
    transform: 'scale(1)',
    opacity: 1
  },
  to: {
    transform: 'scale(0.9)',
    opacity: 0
  }
})

const animationStyles = {
  '&[data-state="entering"], &[data-state="entered"]': {
    animation: `${openAnimation} ${ANIMATION_DURATION}ms ${animationEasing.spring} both`
  },
  '&[data-state="exiting"]': {
    animation: `${closeAnimation} 120ms ${animationEasing.acceleration} both`
  }
}

export interface CornerDialogProps {
  /**
   * Children can be a string, node or a function accepting `({ close })`.
   * When passing a string, <Paragraph size={400} color="muted" /> is used to wrap the string.
   */
  children: React.ReactNode | React.ReactNode | any
  /**
   * The intent of the CornerDialog. Used for the button.
   */
  intent: IntentType
  /**
   * When true, the dialog is shown.
   */
  isShown?: boolean
  /**
   * Title of the Dialog. Titles should use Title Case.
   */
  title?: React.ReactNode
  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?: () => {}
  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?: () => {}
  /**
   * When true, the footer with the cancel and confirm button is shown.
   */
  hasFooter?: boolean
  /**
   * Function that will be called when the confirm button is clicked.
   * This does not close the Dialog. A close function will be passed
   * as a paramater you can use to close the dialog.
   *
   * `onConfirm={(close) => close()}`
   */
  onConfirm?: (close: any) => () => {}
  /**
   * Label of the confirm button.
   */
  confirmLabel?: string
  /**
   * When true, the cancel button is shown.
   */
  hasCancel?: boolean
  /**
   * Function that will be called when the cancel button is clicked.
   * This closes the Dialog by default.
   *
   * `onCancel={(close) => close()}`
   */
  onCancel?: (close: any) => () => {}
  /**
   * Label of the cancel button.
   */
  cancelLabel?: string
  /**
   * Width of the Dialog.
   */
  width?: string | number
  /**
   * Props passed to the Card container. Composes `Card`
   */
  containerProps?: PaneProps
}

interface CornerDialogState {
  exiting: boolean
  exited: boolean
}

export default class CornerDialog extends React.PureComponent<
  CornerDialogProps,
  CornerDialogState
> {
  static defaultProps = {
    width: 392,
    intent: 'none',
    hasFooter: true,
    confirmLabel: 'Learn More',
    hasCancel: true,
    cancelLabel: 'Close',
    onCancel: close => close(),
    onConfirm: close => close()
  }

  state: CornerDialogState = {
    exiting: false,
    exited: !this.props.isShown
  }

  componentWillReceiveProps(nextProps: CornerDialogProps) {
    if (nextProps.isShown && !this.props.isShown) {
      this.setState({
        exited: false
      })
    }
  }

  handleExited = () => {
    this.setState({ exiting: false, exited: true })
    const { onCloseComplete = noop } = this.props
    onCloseComplete()
  }

  handleCancel = () => {
    const { onCancel = noop } = this.props
    onCancel(this.handleClose)
  }

  handleClose = () => {
    this.setState({ exiting: true })
  }

  handleConfirm = () => {
    const { onConfirm = noop } = this.props
    onConfirm(this.handleClose)
  }

  renderChildren = () => {
    const { children } = this.props
    if (typeof children === 'function') {
      return children({ close: this.handleClose })
    }
    if (typeof children === 'string') {
      return (
        <Paragraph size={400} color="muted">
          {children}
        </Paragraph>
      )
    }
    return children
  }

  render() {
    const {
      title,
      width,
      intent,
      isShown,
      hasFooter,
      hasCancel,
      cancelLabel,
      confirmLabel,
      onOpenComplete,
      containerProps
    } = this.props

    const { exiting, exited } = this.state

    if (exited) return null

    return (
      <Portal>
        <Transition
          appear
          unmountOnExit
          timeout={ANIMATION_DURATION}
          in={isShown && !exiting}
          onExited={this.handleExited}
          onEntered={onOpenComplete}
        >
          {state => (
            <Card
              role="dialog"
              backgroundColor="white"
              elevation={4}
              width={width}
              css={animationStyles}
              data-state={state}
              position="fixed"
              bottom={16}
              right={16}
              padding={32}
              {...(containerProps as any)}
            >
              <Pane display="flex" alignItems="center" marginBottom={12}>
                <Heading is="h4" size={600} flex="1">
                  {title}
                </Heading>
                <IconButton
                  height={32}
                  icon={XIcon}
                  appearance="minimal"
                  onClick={this.handleClose}
                />
              </Pane>

              <Pane overflowY="auto" data-state={state}>
                {this.renderChildren()}
              </Pane>

              {hasFooter && (
                <Pane
                  marginTop={24}
                  flexShrink={0}
                  display="flex"
                  flexDirection="row-reverse"
                >
                  <Button
                    appearance="primary"
                    intent={intent}
                    marginLeft={8}
                    onClick={this.handleConfirm}
                  >
                    {confirmLabel}
                  </Button>
                  {hasCancel && (
                    <Button onClick={this.handleCancel}>{cancelLabel}</Button>
                  )}
                </Pane>
              )}
            </Card>
          )}
        </Transition>
      </Portal>
    )
  }
}
