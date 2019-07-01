import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'
import { keyframes } from 'emotion'
import { ThemeContext } from '../../theme'

const loadingKeyframes = keyframes({
  '0%': {
    transform: 'rotate(0)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
})

const loadingCircleKeyframes = keyframes({
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

export interface SpinnerProps extends BoxProps<'div'> {
  /**
   * The size of the spinner.
   * @default 40
   */
  size?: number

  /**
   * Delay after which spinner should be visible.
   * @default 0
   */
  delay?: number

  /**
   * Color of the spinner
   * @default 'default'
   * Passing 'theme' gives a color that adapts the darkness/lightness of the themeColor
   */
  color?: 'default' | 'theme' | string

  /**
   * Adapts the spinnerColor to the adaptive
   * @requires baseColor
   * @default false
   */
  adaptive?: boolean

  /**
   * Color to adapt to when adaptive=true
   */
  baseColor?: string
}

interface SpinnerState {
  isVisible: Boolean
}

class Spinner extends React.PureComponent<SpinnerProps, SpinnerState> {
  public static contextType = ThemeContext

  delayTimer: any

  constructor(props: SpinnerProps) {
    super(props)

    this.state = {
      isVisible: props.delay === 0
    }
  }

  static defaultProps = {
    size: 40,
    delay: 0
  }

  componentDidMount() {
    const { delay = 0 } = this.props

    if (delay > 0) {
      this.delayTimer = setTimeout(() => {
        this.setState({
          isVisible: true
        })
      }, delay)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer)
  }

  render() {
    if (!this.state.isVisible) {
      return null
    }

    const theme = this.context
    const {
      size = 40,
      color = 'default',
      adaptive = false,
      baseColor = theme.getThemeColor(theme),
      ...props
    } = this.props

    return (
      <Box width={size} height={size} lineHeight={0} {...props as any}>
        <Box is="svg" css={outer} x="0px" y="0px" viewBox="0 0 150 150">
          <Box
            is="circle"
            css={
              inner(
                color === 'theme'
                  ? theme.spinnerColor({
                      color: theme.getThemeColor(theme),
                      adaptive,
                      baseColor
                    })
                  : theme.spinnerColor({ color, adaptive, baseColor })
              ) as any
            }
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
