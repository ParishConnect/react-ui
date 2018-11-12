import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { withTheme } from '../../theme'
import Text from './Text'

class Link extends PureComponent {
  static propTypes = {
    ...Text.propTypes,

    /**
     * This attribute names a relationship of the linked document to the current document.
     * Common use case is: rel="noopener noreferrer".
     */
    rel: PropTypes.string,

    /**
     * Specifies the URL of the linked resource. A URL might be absolute or relative.
     */
    href: PropTypes.string,

    /**
     * Specifies whether underline should be present. Default: true
     */
    noUnderline: PropTypes.bool,

    /**
     * Target atrribute, common use case is target="_blank."
     */
    target: PropTypes.string,

    /**
     * The color (and styling) of the Link. Can be default, blue, green or neutral.
     */
    color: PropTypes.string.isRequired,

    /**
     * Theme provided by ThemeProvider.
     */
    theme: PropTypes.object.isRequired,

    /**
     * Class name passed to the link.
     * Only use if you know what you are doing.
     */
    className: PropTypes.string
  }

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
