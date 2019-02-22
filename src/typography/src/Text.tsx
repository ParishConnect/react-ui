import * as React from 'react'
import { Omit } from 'utility-types'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { ThemeContext } from '../../theme/index'

export type TextSize = 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export interface TextProps extends Omit<BoxProps, 'apperance'> {
  /**
   * Size of the text style.
   * Can be: 300, 400, 500, 600.
   */
  size?: TextSize
  /**
   * Font family.
   * Can be: `ui`, `display` or `mono` or a custom font family.
   */
  fontFamily?: 'ui' | 'display' | 'mono' | string
}

class Text extends React.PureComponent<TextProps> {
  public static contextType = ThemeContext
  public static defaultProps = {
    size: 400,
    color: 'default',
    fontFamily: 'ui'
  }
  render() {
    const { size, color, fontFamily, marginTop, ...props } = this.props
    const theme = this.context

    const { marginTop: defaultMarginTop, ...textStyle } = theme.getTextStyle(
      size
    )

    const finalMarginTop =
      marginTop === 'default' ? defaultMarginTop : marginTop

    return (
      <Box
        is="span"
        color={theme.getTextColor(color, theme)}
        fontFamily={theme.getFontFamily(fontFamily)}
        marginTop={finalMarginTop}
        {...textStyle}
        {...props}
      />
    )
  }
}

export default Text
