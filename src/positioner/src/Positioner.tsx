import * as React from 'react'
import { noop } from 'lodash'
import Transition from 'react-transition-group/Transition'
import { Portal } from '../../portal'
import { Stack } from '../../stack'
import {
  StackingOrder,
  Position,
  PositionEnum,
  PositionType
} from '../../constants'
import getPosition from './getPosition'

const animationEasing = {
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

const initialState = () => ({
  top: undefined,
  left: undefined,
  transformOrigin: undefined
})

const getCSS = ({
  initialScale,
  animationDuration
}: {
  initialScale: number
  animationDuration: number
}): object => ({
  position: 'fixed',
  opacity: 0,
  transitionTimingFunction: animationEasing.spring,
  transitionDuration: `${animationDuration}ms`,
  transitionProperty: 'opacity, transform',
  transform: `scale(${initialScale}) translateY(-1px)`,
  '&[data-state="entering"], &[data-state="entered"]': {
    opacity: 1,
    visibility: 'visible',
    transform: 'scale(1)'
  },
  '&[data-state="exiting"]': {
    opacity: 0,
    transform: 'scale(1)'
  }
})

export interface PositionerProps {
  /**
   * The position the element that is being positioned is on.
   * Smart positioning might override this.
   */
  position: PositionEnum | PositionType | string
  /**
   * When true, show the element being positioned.
   */
  isShown?: boolean
  /**
   * The minimum distance from the body to the element being positioned.
   */
  bodyOffset: number
  /**
   * The minimum distance from the target to the element being positioned.
   */
  targetOffset: number
  /**
   * Initial scale of the element being positioned.
   */
  initialScale?: number
  /**
   * Duration of the animation.
   */
  animationDuration?: number
  children: any
  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete(): void
  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete(): void
  /**
   * Function that should return a node for the target.
   * ({ getRef: () -> Ref, isShown: Bool }) -> React Node
   */
  target(args: any): React.ReactNode
  /**
   * Function that returns the ref of the element being positioned.
   */
  innerRef(ref: HTMLElement): HTMLElement
}

interface PositionerState {
  top: number | undefined
  left: number | undefined
  transformOrigin: any
}

export default class Positioner extends React.PureComponent<
  PositionerProps,
  PositionerState
> {
  public static defaultProps = {
    position: Position.BOTTOM,
    bodyOffset: 6,
    targetOffset: 6,
    initialScale: 0.9,
    animationDuration: 300,
    innerRef: noop(),
    onOpenComplete: noop(),
    onCloseComplete: noop()
  }
  state: PositionerState = initialState()

  latestAnimationFrame: any
  targetRef: HTMLElement
  positionerRef: HTMLElement

  componentWillUnmount() {
    if (this.latestAnimationFrame) {
      cancelAnimationFrame(this.latestAnimationFrame)
    }
  }

  getTargetRef = (ref: HTMLElement) => {
    this.targetRef = ref
  }

  getRef = (ref: HTMLElement) => {
    this.positionerRef = ref
    this.props.innerRef(ref)
  }

  handleEnter = () => {
    this.update()
  }

  update = (prevHeight = 0, prevWidth = 0) => {
    if (!this.props.isShown || !this.targetRef || !this.positionerRef) {
      return
    }

    const targetRect = this.targetRef.getBoundingClientRect()
    const hasEntered =
      this.positionerRef.getAttribute('data-state') === 'entered'

    const viewportHeight = document.documentElement.clientHeight
    const viewportWidth = document.documentElement.clientWidth

    let height: number
    let width: number
    if (hasEntered) {
      // Only when the animation is done should we opt-in to `getBoundingClientRect`
      const positionerRect = this.positionerRef.getBoundingClientRect()

      /**
       *  Issue: https://github.com/segmentio/evergreen/issues/255
       * We need to ceil the width and height to prevent jitter when
       * the window is zoomed (when `window.devicePixelRatio` is not an integer)
       */
      height = Math.round(positionerRect.height)
      width = Math.round(positionerRect.width)
    } else {
      /**
       * When the animation is in flight use `offsetWidth/Height` which
       * does not calculate the `transform` property as part of its result.
       * There is still change on jitter during the animation (although unoticable)
       * When the browser is zoomed in — we fix this with `Math.max`.
       */
      height = Math.max(this.positionerRef.offsetHeight, prevHeight)
      width = Math.max(this.positionerRef.offsetWidth, prevWidth)
    }

    const { rect, transformOrigin } = getPosition({
      position: this.props.position,
      targetRect,
      targetOffset: this.props.targetOffset,
      dimensions: {
        height,
        width
      },
      viewport: {
        width: viewportWidth,
        height: viewportHeight
      },
      viewportOffset: this.props.bodyOffset
    })

    this.setState(
      {
        left: rect.left,
        top: rect.top,
        transformOrigin
      },
      () => {
        this.latestAnimationFrame = requestAnimationFrame(() => {
          this.update(height, width)
        })
      }
    )
  }

  handleExited = () => {
    this.setState(
      () => {
        return {
          ...initialState()
        }
      },
      () => {
        this.props.onCloseComplete()
      }
    )
  }

  render() {
    const {
      target,
      isShown,
      children,
      initialScale = 0.9,
      animationDuration = 300
    } = this.props

    const { left, top, transformOrigin } = this.state

    return (
      <Stack value={StackingOrder.POSITIONER}>
        {(zIndex: number) => {
          return (
            <React.Fragment>
              {target({ getRef: this.getTargetRef, isShown })}

              <Transition
                appear
                in={isShown}
                timeout={animationDuration}
                onEnter={this.handleEnter}
                onEntered={this.props.onOpenComplete}
                onExited={this.handleExited}
                unmountOnExit
              >
                {state => (
                  <Portal>
                    {children({
                      top,
                      left,
                      state,
                      zIndex,
                      css: getCSS({
                        initialScale,
                        animationDuration
                      }),
                      style: {
                        transformOrigin,
                        left,
                        top,
                        zIndex
                      },
                      getRef: this.getRef,
                      animationDuration
                    })}
                  </Portal>
                )}
              </Transition>
            </React.Fragment>
          )
        }}
      </Stack>
    )
  }
}
