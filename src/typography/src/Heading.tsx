import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'
import { ThemeContext } from '../../theme/index'

export declare interface HeadingProps
  extends BoxProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
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

  marginBottom?: boolean | number | string
  isUppercase?: boolean
}

class Heading extends React.PureComponent<HeadingProps> {
  static contextType = ThemeContext
  public static defaultProps = {
    size: 500
  }

  getColor(color: string | undefined) {
    const theme = this.context
    if (color === 'theme') {
      return theme.getThemeColor(theme)
    }
    return color
  }

  render() {
    const { color, marginTop, size, ...props } = this.props
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
        {...(props as any)}
      />
    )
  }
}

export default Heading
