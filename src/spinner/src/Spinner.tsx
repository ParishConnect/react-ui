import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { keyframes } from 'glamor'
import { ThemeContext } from '../../theme'

const loadingKeyframes = keyframes('loading', {
  '0%': {
    transform: 'rotate(0)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
})

const loadingCircleKeyframes = keyframes('loading-circle', {
  '0%': {
    strokeDashoffset: 600
  },
  '100%': {
    strokeDashoffset: 0
  }
})

const outer = {
  animation: `${loadingKeyframes} 2s linear infinite`
}

const inner = (color: string) => ({
  strokeDashoffset: 600,
  strokeDasharray: 300,
  strokeWidth: 12,
  strokeMiterlimit: 10,
  strokeLinecap: 'round',
  animation: `${loadingCircleKeyframes} 1.6s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite`,
  stroke: color,
  fill: 'transparent'
})

export interface SpinnerProps extends BoxProps {
  size?: number
}

class Spinner extends React.PureComponent<SpinnerProps> {
  public static contextType = ThemeContext

  static defaultProps = {
    size: 40
  }

  render() {
    const { size, ...props } = this.props
    const theme = this.context
    return (
      <Box width={size} height={size} lineHeight={0} {...props}>
        <Box is="svg" css={outer} x="0px" y="0px" viewBox="0 0 150 150">
          <Box
            is="circle"
            css={inner(theme.spinnerColor(theme.themeColor))}
            cx="75"
            cy="75"
            r="60"
          />
        </Box>
      </Box>
    )
  }
}

export default Spinner
