import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { withTheme } from '../../theme'

export type TextProps = BoxProps & {
  /**
   * Size of the text style.
   * Can be: 300, 400, 500, 600.
   */
  size: 300 | 400 | 500 | 600 | 700 | 800
  /**
   * Font family.
   * Can be: `ui`, `display` or `mono` or a custom font family.
   */
  fontFamily: 'ui' | 'display' | 'mono' | string
}

class Text extends React.PureComponent<TextProps> {
  render() {
    const {
      theme,
      size = 400,
      color = 'default',
      fontFamily = 'ui',
      marginTop,
      ...props
    } = this.props

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

export default withTheme(Text)
