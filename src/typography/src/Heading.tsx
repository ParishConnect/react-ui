import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { withTheme } from '../../theme'
import { ThemeType } from '../../constants'

export declare interface HeadingProps {
  /**
   * The size of the heading.
   */
  size: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  /**
   * The color of the heading. Use 'theme' to set as theme color
   */
  color?: string
  /**
   * Pass `default` to use the default margin top for that size.
   */
  marginTop?: boolean | number | string
  /**
   * Theme provided by ThemeProvider.
   */
  theme: ThemeType
}

class Heading extends React.PureComponent<BoxProps & HeadingProps> {
  static defaultProps = {
    size: 500
  }

  getColor(color: string | undefined) {
    const { theme } = this.props
    if (color === 'theme') {
      return theme.palette[theme.themeColor].base
    }
    return color
  }

  render() {
    const { theme, color, marginTop, size, ...props } = this.props
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

export default withTheme(Heading)
