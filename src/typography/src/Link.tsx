import * as React from 'react'
import cx from 'classnames'
import { withTheme } from '../../theme'
import Text, { TextProps } from './Text'
import { ThemeType } from '../../constants'

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
  noUnderline: boolean
  /**
   * Target atrribute, common use case is target="_blank."
   */
  target?: string
  /**
   * The color (and styling) of the Link. Can be default, blue, green or neutral.
   */
  color?: string
  /**
   * Theme provided by ThemeProvider.
   */
  theme: ThemeType
  /**
   * Class name passed to the link.
   * Only use if you know what you are doing.
   */
  className?: string
}

class Link extends React.PureComponent<TextProps & LinkProps> {
  static defaultProps = {
    noUnderline: false
  }

  render() {
    const { theme, className, color, noUnderline, ...props } = this.props

    const themedClassName = theme.getLinkClassName(color || theme.themeColor)

    return (
      <Text
        is="a"
        className={cx(className, themedClassName)}
        textDecoration={noUnderline ? 'none' : 'underline'}
        color={null}
        {...props}
      />
    )
  }
}

export default withTheme(Link)
