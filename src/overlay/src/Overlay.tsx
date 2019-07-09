import * as React from 'react'

import Transition from 'react-transition-group/Transition'
import Box from '@parishconnect/box'
import { keyframes } from '@emotion/core'
import { Portal } from '../../portal'
import { Stack } from '../../stack'
import { StackingOrder } from '../../constants'
import { ThemeContext } from '../../theme'
import safeInvoke from '../../lib/safe-invoke'
import preventBodyScroll from '../../lib/prevent-body-scroll'

const animationEasing = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

const ANIMATION_DURATION = 240

const fadeInAnimation = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
})

const fadeOutAnimation = keyframes({
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  }
})

const animationStyles = backgroundColor => ({
  '&::before': {
    backgroundColor,
    left: 0,
    top: 0,
    position: 'fixed',
    display: 'block',
    width: '100%',
    height: '100%',
    content: '" "'
  },
  '&[data-state="entering"]::before, &[data-state="entered"]::before': {
    animation: `${fadeInAnimation} ${ANIMATION_DURATION}ms ${animationEasing.deceleration} both`
  },
  '&[data-state="exiting"]::before, &[data-state="exited"]::before': {
    animation: `${fadeOutAnimation} ${ANIMATION_DURATION}ms ${animationEasing.acceleration} both`
  }
})

export interface OverlayProps {
  /**
   * Children can be a node or a function accepting `close: func`
   * and `state: ENTERING | ENTERED | EXITING | EXITED`.
   */
  children: any
  /**
   * Show the component; triggers the enter or exit states.
   */
  isShown?: boolean

  /**
   * Props to be passed through on the inner Box.
   */
  containerProps?: object

  /**
   * Whether or not to prevent body scrolling outside the context of the overlay
   */
  preventBodyScrolling?: boolean

  /**
   * Boolean indicating if clicking the overlay should close the overlay.
   */
  shouldCloseOnClick?: boolean

  /**
   * Boolean indicating if pressing the esc key should close the overlay.
   */
  shouldCloseOnEscapePress?: boolean

  /**
   * Function called when overlay is about to close.
   * Return `false` to prevent the sheet from closing.
   * type: `Function -> Boolean`
   */
  onBeforeClose?: any

  /**
   * Callback fired before the "exiting" status is applied.
   * type: `Function(node: HtmlElement) -> void`
   */
  onExit?: any

  /**
   * Callback fired after the "exiting" status is applied.
   * type: `Function(node: HtmlElement) -> void`
   */
  onExiting?: any

  /**
   * Callback fired after the "exited" status is applied.
   * type: `Function(exitState: Any?, node: HtmlElement) -> void`
   */
  onExited?: any

  /**
   * Callback fired before the "entering" status is applied.
   * An extra parameter isAppearing is supplied to indicate if the enter stage
   * is occurring on the initial mount.
   *
   * type: `Function(node: HtmlElement, isAppearing: bool) -> void`
   */
  onEnter?: any

  /**
   * Callback fired after the "entering" status is applied.
   * An extra parameter isAppearing is supplied to indicate if the enter stage
   * is occurring on the initial mount.
   *
   * type: `Function(node: HtmlElement, isAppearing: bool) -> void`
   */
  onEntering?: any

  /**
   * Callback fired after the "entered" status is applied.
   * An extra parameter isAppearing is supplied to indicate if the enter stage
   * is occurring on the initial mount.
   *
   * type: `Function(node: HtmlElement, isAppearing: bool) -> void`
   */
  onEntered?: any

  /**
   * Object that overrides certain css properties
   */
  css?: any
}

interface OverlayState {
  exiting: boolean
  exited: boolean
}

/**
 * Overlay is essentially a wrapper around react-transition-group/Transition
 * Learn more: https://reactcommunity.org/react-transition-group/
 */
class Overlay extends React.Component<OverlayProps, OverlayState> {
  static contextType = ThemeContext
  static defaultProps = {
    onHide: () => {},
    shouldCloseOnClick: true,
    shouldCloseOnEscapePress: true,
    preventBodyScrolling: false,
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {}
  }

  containerElement: any
  previousActiveElement: any

  state: OverlayState = {
    exiting: false,
    exited: !this.props.isShown
  }

  componentDidUpdate(prevProps: OverlayProps) {
    if (!prevProps.isShown && this.props.isShown) {
      this.setState({
        exited: false
      })
    }
  }

  componentWillUnmount() {
    this.handleBodyScroll(false)
    document.body.removeEventListener('keydown', this.onEsc, false)
  }

  /**
   * Methods borrowed from BlueprintJS
   * https://github.com/palantir/blueprint/blob/release/2.0.0/packages/core/src/components/overlay/overlay.tsx
   */
  bringFocusInsideOverlay = () => {
    // Always delay focus manipulation to just before repaint to prevent scroll jumping
    return requestAnimationFrame(() => {
      // Container ref may be undefined between component mounting and Portal rendering
      // ActiveElement may be undefined in some rare cases in IE

      if (
        this.containerElement == null || // tslint:disable-line:triple-equals
        document.activeElement == null || // tslint:disable-line:triple-equals
        !this.props.isShown
      ) {
        return
      }

      const isFocusOutsideModal = !this.containerElement.contains(
        document.activeElement
      )
      if (isFocusOutsideModal) {
        // Element marked autofocus has higher priority than the other clowns
        const autofocusElement = this.containerElement.querySelector(
          '[autofocus]'
        )
        const wrapperElement = this.containerElement.querySelector('[tabindex]')
        const buttonElement = this.containerElement.querySelector('button')

        if (autofocusElement) {
          autofocusElement.focus()
        } else if (wrapperElement) {
          wrapperElement.focus()
        } else if (buttonElement) {
          buttonElement.focus()
        }
      }
    })
  }

  bringFocusBackToTarget = () => {
    return requestAnimationFrame(() => {
      if (
        this.containerElement == null || // tslint:disable-line:triple-equals
        document.activeElement == null // tslint:disable-line:triple-equals
      ) {
        return
      }

      const isFocusInsideModal = this.containerElement.contains(
        document.activeElement
      )

      // Bring back focus on the target.
      if (
        this.previousActiveElement &&
        (document.activeElement === document.body || isFocusInsideModal)
      ) {
        this.previousActiveElement.focus()
      }
    })
  }

  onEsc = (e: KeyboardEvent) => {
    // Esc key
    if (e.keyCode === 27 && this.props.shouldCloseOnEscapePress) {
      this.close()
    }
  }

  close = () => {
    const shouldClose = safeInvoke(this.props.onBeforeClose)
    if (shouldClose !== false) {
      this.setState({ exiting: true })
    }
  }

  handleBodyScroll = (preventScroll: any) => {
    if (this.props.preventBodyScrolling) {
      preventBodyScroll(preventScroll)
    }
  }

  handleEnter = () => {
    this.handleBodyScroll(true)
    safeInvoke(this.props.onEnter)
  }

  handleEntering = (node: any) => {
    document.body.addEventListener('keydown', this.onEsc, false)
    this.props.onEntering(node)
  }

  handleEntered = (node: any) => {
    this.previousActiveElement = document.activeElement
    this.bringFocusInsideOverlay()
    this.props.onEntered(node)
  }

  handleExit = () => {
    this.handleBodyScroll(false)
    safeInvoke(this.props.onExit)
  }

  handleExiting = (node: any) => {
    document.body.removeEventListener('keydown', this.onEsc, false)
    this.bringFocusBackToTarget()
    this.props.onExiting(node)
  }

  handleExited = (node: any) => {
    this.setState({ exiting: false, exited: true })
    this.props.onExited(node)
  }

  handleBackdropClick = (e: MouseEvent) => {
    if (e.target !== e.currentTarget || !this.props.shouldCloseOnClick) {
      return
    }

    this.close()
  }

  onContainerRef = (ref: any) => {
    this.containerElement = ref
  }

  render() {
    const { containerProps = {}, css, isShown, children } = this.props
    const theme = this.context

    const { exiting, exited } = this.state

    if (exited) {
      return null
    }

    return (
      <Stack value={StackingOrder.OVERLAY}>
        {zIndex => (
          <Portal>
            <Transition
              appear
              unmountOnExit
              timeout={ANIMATION_DURATION}
              in={isShown && !exiting}
              onExit={this.handleExit}
              onExiting={this.handleExiting}
              onExited={this.handleExited}
              onEnter={this.handleEnter}
              onEntering={this.handleEntering}
              onEntered={this.handleEntered}
            >
              {state => (
                <Box
                  onClick={this.handleBackdropClick}
                  innerRef={this.onContainerRef}
                  position="fixed"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  zIndex={zIndex}
                  css={{
                    ...animationStyles(theme.overlayBackgroundColor),
                    ...css
                  }}
                  data-state={state}
                  {...containerProps}
                >
                  {typeof children === 'function'
                    ? children({
                        state,
                        close: this.close
                      })
                    : children}
                </Box>
              )}
            </Transition>
          </Portal>
        )}
      </Stack>
    )
  }
}

export default Overlay
