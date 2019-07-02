import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'
import { ThemeContext } from '../../theme'

export type ParagraphSize = 300 | 400 | 500

export interface ParagraphProps extends BoxProps {
  /**
   * Size of the text style.
   * Can be: 300, 400, 500.
   */
  size?: ParagraphSize
  /**
   * Font family.
   * Can be: `ui`, `display` or `mono` or a custom font family.
   */
  fontFamily?: 'ui' | 'display' | 'mono' | string
}

class Paragraph extends React.PureComponent<ParagraphProps> {
  public static contextType = ThemeContext
  public static defaultProps = {
    size: 400,
    color: 'default',
    fontFamily: 'ui'
  }
  render() {
    const { size, color, fontFamily, marginTop, ...props } = this.props
    const theme = this.context

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
        {...(props as any)}
      />
    )
  }
}

export default Paragraph
