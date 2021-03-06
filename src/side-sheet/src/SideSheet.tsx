import { keyframes } from '@emotion/core'
import * as React from 'react'
import { Position, PositionEnum, PositionType } from '../../constants'
import { Pane } from '../../layers'
import { Overlay } from '../../overlay'
import SheetClose from './SheetClose'

const paneProps = {
  [Position.LEFT]: {
    height: '100vh',
    maxWidth: '100vw',
    position: 'absolute',
    left: 0,
    right: 'auto'
  },
  [Position.RIGHT]: {
    height: '100vh',
    maxWidth: '100vw',
    position: 'absolute',
    right: 0,
    left: 'auto'
  },
  [Position.TOP]: {
    width: '100vw',
    position: 'absolute',
    maxHeight: '100vh',
    top: 0,
    bottom: 'auto'
  },
  [Position.BOTTOM]: {
    width: '100vw',
    maxHeight: '100vh',
    position: 'absolute',
    bottom: 0,
    top: 'auto'
  }
}

const subpaneProps = {
  [Position.LEFT]: {
    height: '100vh'
  },
  [Position.RIGHT]: {
    height: '100vh'
  },
  [Position.TOP]: {
    width: '100vw'
  },
  [Position.BOTTOM]: {
    width: '100vw'
  }
}

const animationEasing = {
  deceleration: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
  acceleration: `cubic-bezier(0.4, 0.0, 1, 1)`
}

const ANIMATION_DURATION = 240

const withAnimations = (animateIn: any, animateOut: any) => {
  return {
    '&[data-state="entering"], &[data-state="entered"]': {
      animation: `${animateIn} ${ANIMATION_DURATION}ms ${animationEasing.deceleration} both`
    },
    '&[data-state="exiting"]': {
      animation: `${animateOut} ${ANIMATION_DURATION}ms ${animationEasing.acceleration} both`
    }
  }
}

const animationStyles = {
  [Position.LEFT]: {
    transform: `translateX(-100%)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateX(-100%)` },
        to: { transform: `translateX(0)` }
      }),
      keyframes({
        from: { transform: `translateX(0)` },
        to: { transform: `translateX(-100%)` }
      })
    )
  },
  [Position.RIGHT]: {
    transform: `translateX(100%)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateX(100%)` },
        to: { transform: `translateX(0)` }
      }),
      keyframes({
        from: { transform: `translateX(0)` },
        to: { transform: `translateX(100%)` }
      })
    )
  },
  [Position.TOP]: {
    transform: `translateY(-100%)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateY(-100%)` },
        to: { transform: `translateY(0)` }
      }),
      keyframes({
        from: { transform: `translateY(0)` },
        to: { transform: `translateY(-100%)` }
      })
    )
  },
  [Position.BOTTOM]: {
    transform: `translateY(100%)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateY(100%)` },
        to: { transform: `translateY(0)` }
      }),
      keyframes({
        from: { transform: `translateY(0)` },
        to: { transform: `translateY(100%)` }
      })
    )
  }
}

export interface SideSheetProps {
  /**
   * Children can be a string, node or a function accepting `({ close })`.
   */
  children: any

  /**
   * When true, the Side Sheet is shown.
   */
  isShown?: boolean

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?: any

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?: any

  /**
   * Width of the SideSheet.
   */
  width: string | number

  /**
   * Properties to pass through the SideSheet container Pane.
   */
  containerProps?: object

  /**
   * Positions the sheet to the top, left, right, or bottom of the screen.
   */
  position: PositionEnum | PositionType
}

class SideSheet extends React.Component<SideSheetProps> {
  static defaultProps = {
    width: 620,
    onCloseComplete: () => {},
    onOpenComplete: () => {},
    position: Position.RIGHT
  }

  render() {
    const {
      width,
      isShown,
      children,
      containerProps,
      onOpenComplete,
      onCloseComplete,
      position
    } = this.props

    return (
      <Overlay
        isShown={isShown}
        onExited={onCloseComplete}
        onEntered={onOpenComplete}
      >
        {({ state, close }: any) => (
          <Pane
            width={width}
            {...paneProps[position]}
            css={animationStyles[position]}
            data-state={state}
          >
            <SheetClose
              position={position}
              data-state={state}
              isClosing={false}
              onClick={close}
            />
            <Pane
              elevation={4}
              backgroundColor="white"
              overflowY="auto"
              maxHeight="100vh"
              data-state={state}
              width={width}
              {...subpaneProps[position]}
              {...containerProps}
            >
              {typeof children === 'function' ? children({ close }) : children}
            </Pane>
          </Pane>
        )}
      </Overlay>
    )
  }
}

export default SideSheet
