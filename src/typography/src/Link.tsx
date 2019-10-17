import * as React from 'react'
import { ThemeContext } from '../../theme/index'
import Text, { TextProps } from './Text'

export declare interface LinkProps {
  /**
   * This attribute names a relationship of the linked document to the current document.
   * Common use case is: rel="noopener noreferrer".
   */
  rel?: string
  /**
   * Specifies the URL of the linked resource. A URL might be absolute or relative.
   */
  href?: string
  /**
   * Specifies whether underline should be present. Default: true
   */
  noUnderline?: boolean
  /**
   * Target atrribute, common use case is target="_blank."
   */
  target?: string
  /**
   * The color (and styling) of the Link. Can be default, blue, green or neutral.
   */
  color?: string
}

class Link extends React.PureComponent<TextProps & LinkProps> {
  static contextType = ThemeContext
  static defaultProps = {
    noUnderline: false
  }

  render() {
    const { color, noUnderline = false, css, ...props } = this.props
    const theme = this.context

    const themedCSS = theme.getLinkCSS(color || theme.themeColor)

    return (
      <Text
        is="a"
        textDecoration={noUnderline ? 'none' : 'underline'}
        color={undefined}
        css={[themedCSS, css]}
        {...props}
      />
    )
  }
}

export default Link
