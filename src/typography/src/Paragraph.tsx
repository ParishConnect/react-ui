import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { withTheme } from '../../theme'
import { ThemeType } from '../../constants'

export declare type ParagraphProps = BoxProps & {
  /**
   * Size of the text style.
   * Can be: 300, 400, 500.
   */
  size: 300 | 400 | 500
  /**
   * Font family.
   * Can be: `ui`, `display` or `mono` or a custom font family.
   */
  fontFamily: 'ui' | 'display' | 'mono' | string
  theme: ThemeType
}

class Paragraph extends React.PureComponent<ParagraphProps> {
  render() {
    const {
      theme,
      size = 400,
      color = 'default',
      fontFamily = 'ui',
      marginTop,
      ...props
    } = this.props

    const {
      marginTop: defaultMarginTop,
      ...textStyle
    } = theme.getParagraphStyle(size)

    const finalMarginTop =
      marginTop === 'default' ? defaultMarginTop : marginTop

    return (
      <Box
        is="p"
        color={theme.getTextColor(color, theme)}
        fontFamily={theme.getFontFamily(fontFamily)}
        marginTop={finalMarginTop || 0}
        marginBottom={0}
        {...textStyle}
        {...props}
      />
    )
  }
}

export default withTheme(Paragraph)
