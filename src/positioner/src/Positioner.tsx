import * as React from 'react'
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
import { noop } from 'lodash'

const animationEasing = {
  spring: `cubic-bezier(0.175, 0.885, 0.320, 1.175)`
}

const initialState = () => ({
  top: null,
  left: null,
  transformOrigin: null
})

const getCSS = ({ initialScale, animationDuration }: any) => ({
  position: 'fixed',
  opacity: 0,
  transitionTimingFunction: animationEasing.spring,
  transitionDuration: `${animationDuration}ms`,
  transitionProperty: 'opacity, transform',
  transform: `scale(${initialScale}) translateY(-1px)`,
  '&[data-state="entering"], &[data-state="entered"]': {
    opacity: 1,
    visibility: 'visible',
    transform: `scale(1)`
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
  position: PositionEnum | PositionType

  /**
   * When true, show the element being positioned.
   */
  isShown: boolean

  /**
   * Function that returns the element being positioned.
   */
  children: any

  /**
   * Function that returns the ref of the element being positioned.
   */
  innerRef: any

  /**
   * The minimum distance from the body to the element being positioned.
   */
  bodyOffset: number

  /**
   * The minimum distance from the target to the element being positioned.
   */
  targetOffset: number

  /**
   * Function that should return a node for the target.
   * ({ getRef: () -> Ref, isShown: Bool }) -> React Node
   */
  target: any

  /**
   * Initial scale of the element being positioned.
   */
  initialScale: number

  /**
   * Duration of the animation.
   */
  animationDuration: number

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete: any

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete: any
}

interface PositionerState {
  top: number | null | any
  left: number | null | any
  transformOrigin: number | null | any
}

export default class Positioner extends React.PureComponent<
  PositionerProps,
  PositionerState
> {
  static defaultProps = {
    position: Position.BOTTOM,
    bodyOffset: 6,
    targetOffset: 6,
    initialScale: 0.9,
    animationDuration: 300,
    innerRef: noop,
    onOpenComplete: noop,
    onCloseComplete: noop
  }

  latestAnimationFrame: any
  targetRef: any
  positionerRef: any

  constructor(props: PositionerProps) {
    super(props)
    this.state = initialState()
  }

  componentWillUnmount() {
    if (this.latestAnimationFrame) {
      cancelAnimationFrame(this.latestAnimationFrame)
    }
  }

  getTargetRef = (ref: any) => {
    this.targetRef = ref
  }

  getRef = (ref: any) => {
    this.positionerRef = ref
    this.props.innerRef(ref)
  }

  handleEnter = () => {
    this.update()
  }

  update = (prevHeight = 0, prevWidth = 0) => {
    if (!this.props.isShown || !this.targetRef || !this.positionerRef) return

    const targetRect = this.targetRef.getBoundingClientRect()
    const hasEntered =
      this.positionerRef.getAttribute('data-state') === 'entered'

    const viewportHeight = document.documentElement.clientHeight
    const viewportWidth = document.documentElement.clientWidth

    let height: number | undefined
    let width: number | undefined
    if (hasEntered) {
      // Only when the animation is done should we opt-in to `getBoundingClientRect`
      const positionerRect = this.positionerRef.getBoundingClientRect()

      // Https://github.com/segmentio/evergreen/issues/255
      // We need to ceil the width and height to prevent jitter when
      // The window is zoomed (when `window.devicePixelRatio` is not an integer)
      height = Math.round(positionerRect.height)
      width = Math.round(positionerRect.width)
    } else {
      // When the animation is in flight use `offsetWidth/Height` which
      // Does not calculate the `transform` property as part of its result.
      // There is still change on jitter during the animation (although unoticable)
      // When the browser is zoomed in — we fix this with `Math.max`.
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
      initialScale,
      targetOffset,
      animationDuration
    } = this.props

    const { left, top, transformOrigin } = this.state

    return (
      <Stack value={StackingOrder.POSITIONER}>
        {(zIndex: any) => {
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
                        targetOffset,
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
