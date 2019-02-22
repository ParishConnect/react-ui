import * as React from 'react'
import { HTMLAttributes, ComponentClass } from 'react'
import styled, { css } from 'styled-components'
import { colors, gridSize } from '@atlaskit/theme'
import { majorScale } from '../../../scales/index'
import Box from '@hennessyevan/aluminum-box'
import { scales } from '../../../theme/src/default-theme/foundational-styles/index'

const akGridSize = majorScale(1) + 'px'

export const ButtonGroup = props => (
  <Box
    is="span"
    display="inline-flex"
    alignItems="center"
    css={{ '& > div': { display: 'flex' } }}
    {...props}
  />
)

export const Separator = props => (
  <Box
    is="span"
    background={scales.neutral.N4}
    width={1}
    height={majorScale(3)}
    display="inline-block"
    marginX={majorScale(1)}
    {...props}
  />
)

export const Wrapper = props => (
  <Box
    display="flex"
    alignItems="center"
    css={{
      '> div, > span': { display: 'flex' },
      '> div > div': {
        display: 'flex'
      }
    }}
    {...props}
  />
)

export const TriggerWrapper = props => (
  <Box display="flex" alignItems="center" {...props} />
)

export const ButtonContent = props => (
  <Box
    is="span"
    display="flex"
    minWidth={80}
    height={24}
    lineHeight={24}
    alignItems="center"
    padding={`${(props: any) => (props.width ? 0 : '0 8px')}`}
    flexDirection="column"
    {...props}
  />
)

// Taken from the style of inline dialog components
export const dropShadow = css`
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),
    0 4px 8px -2px rgba(9, 30, 66, 0.25);
`

export const scrollbarStyles = `
  -ms-overflow-style: -ms-autohiding-scrollbar;

  &::-webkit-scrollbar {
    height: ${akGridSize};
    width: ${akGridSize};
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: ${akGridSize};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`

export const scrollbarObjectStyles = {
  '-ms-overflow-style': '-ms-autohiding-scrollbar',

  '&::-webkit-scrollbar': {
    height: akGridSize,
    width: akGridSize
  },

  '&::-webkit-scrollbar-corner': {
    display: 'none'
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },

  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: akGridSize
  },

  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
}

export const Shortcut = props => (
  <Box is="small" color={scales.neutral.N5} marginTop={0} {...props} />
)
