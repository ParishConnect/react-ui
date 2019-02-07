import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { ThemeContext } from '../../theme'

export declare interface HeadingProps extends BoxProps {
  /**
   * The size of the heading.
   */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  /**
   * The color of the heading. Use 'theme' to set as theme color
   */
  color?: string
  /**
   * Pass `default` to use the default margin top for that size.
   */
  marginTop?: boolean | number | string
}

class Heading extends React.PureComponent<HeadingProps> {
  static contextType = ThemeContext
  public static defaultProps = {
    size: 500
  }

  getColor(color: string | undefined) {
    const theme = this.context
    if (color === 'theme') {
      return theme.palette[theme.themeColor].base
    }
    return color
  }

  render() {
    const { color = '#2d2d2d', marginTop, size, ...props } = this.props
    const theme = this.context

    const {
      marginTop: defaultMarginTop,
      ...headingStyle
    } = theme.getHeadingStyle(size)

    let finalMarginTop = marginTop
    if (marginTop === 'default') {
      finalMarginTop = defaultMarginTop
    }

    return (
      <Box
        is="h2"
        marginTop={finalMarginTop || 0}
        marginBottom={0}
        {...headingStyle}
        color={this.getColor(color)}
        {...props}
      />
    )
  }
}

export default Heading
