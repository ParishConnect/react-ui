import { css, keyframes } from '@emotion/core'
import Box, { BoxProps } from '@parishconnect/box'
import * as React from 'react'
import { Position, PositionEnum, PositionType } from '../../constants'
import { XIcon } from '../../icons/index'

const animationEasing = {
  deceleration: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
  acceleration: `cubic-bezier(0.4, 0.0, 1, 1)`
}

const ANIMATION_DURATION = 240

const sharedStyles: any = {
  padding: 4,
  borderRadius: 9999,
  position: 'absolute',
  cursor: 'pointer',
  backgroundColor: `rgba(255, 255, 255, 0.4)`,
  transition: `background-color 120ms`,
  '&:hover': {
    backgroundColor: `rgba(255, 255, 255, 0.6)`
  },
  '&:active': {
    backgroundColor: `rgba(255, 255, 255, 0.4)`
  }
}

const withAnimations = (animateIn: string, animateOut: string) => {
  return {
    '&[data-state="entering"], &[data-state="entered"]': {
      animation: `${animateIn} ${ANIMATION_DURATION}ms ${animationEasing.deceleration} both`
    },
    '&[data-state="exiting"]': {
      animation: `${animateOut} ${ANIMATION_DURATION}ms ${animationEasing.acceleration} both`
    }
  }
}

const sheetCloseStyles = {
  [Position.RIGHT]: {
    left: 0,
    marginLeft: -12,
    marginTop: 12,
    transform: `translateX(-100%)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateX(100%) rotate(0deg)` },
        to: { transform: `translateX(-100%) rotate(-360deg)` }
      }),
      keyframes({
        from: { transform: `translateX(-100%) rotate(0deg)` },
        to: { transform: `translateX(100%) rotate(360deg)` }
      })
    )
  },
  [Position.LEFT]: {
    marginRight: -12,
    right: 0,
    marginTop: 12,
    transform: `translateX(100%)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateX(-100%) rotate(0deg)` },
        to: { transform: `translateX(100%), rotate(360deg)` }
      }),
      keyframes({
        from: { transform: `translateX(100%) rotate(0deg)` },
        to: { transform: `translateX(-100%), rotate(360deg)` }
      })
    )
  },
  [Position.TOP]: {
    right: 0,
    marginRight: 12,
    top: '100%',
    marginTop: 12,
    transform: `translateY(0)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateY(-200%) rotate(0deg)` },
        to: { transform: `translateY(0%), rotate(360deg)` }
      }),
      keyframes({
        from: { transform: `translateY(0%) rotate(0deg)` },
        to: { transform: `translateY(-200%), rotate(360deg)` }
      })
    )
  },
  [Position.BOTTOM]: {
    right: 0,
    marginRight: 12,
    bottom: '100%',
    marginBottom: 12,
    transform: `translateY(0)`,
    ...withAnimations(
      keyframes({
        from: { transform: `translateY(200%) rotate(0deg)` },
        to: { transform: `translateY(0%), rotate(360deg)` }
      }),
      keyframes({
        from: { transform: `translateY(0%) rotate(0deg)` },
        to: { transform: `translateY(200%), rotate(360deg)` }
      })
    )
  }
}

const sheetCloseCSSCache = {}

const getSheetCloseCSS = (position: PositionEnum | PositionType) => {
  if (!sheetCloseCSSCache[position]) {
    sheetCloseCSSCache[position] = css({
      ...sheetCloseStyles[position],
      ...sharedStyles
    })
  }
  return sheetCloseCSSCache[position]
}

export interface SheetCloseProps {
  isClosing?: boolean
  position?: PositionEnum | PositionType
}

export default class SheetClose extends React.PureComponent<
  Omit<BoxProps, 'postition'> & { position: PositionType }
> {
  render() {
    const { isClosing, position, ...props } = this.props
    return (
      <Box
        width={32}
        height={32}
        display="flex"
        alignItems="center"
        justifyContent="center"
        css={getSheetCloseCSS(position as PositionType)}
        {...props}
      >
        <XIcon color="#fff" />
      </Box>
    )
  }
}
