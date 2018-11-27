import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Box from '@hennessyevan/aluminum-box'
import { withTheme } from '../../theme'

const StringAndBoolPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.bool
])

class Pane extends PureComponent {
  static propTypes = {
    /**
     * Composes the Box component as the base.
     */
    ...Box.propTypes,

    /**
     * Appearance
     * Values: 'gradient', 'solid', 'white'
     * --- Uses themeColor property
     */
    appearance: PropTypes.string,

    /**
     * Background property.
     * `tint1`, `tint2` etc. from `theme.colors.background` are available.
     */
    background: PropTypes.string,

    /**
     * Elevation of the Pane.
     * Values: 0, 1, 2, 3, 4.
     */
    elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),

    /**
     * Elevation of the Pane on hover. Might get deprecated.
     * Values: 0, 1, 2, 3, 4.
     */
    hoverElevation: PropTypes.oneOf([0, 1, 2, 3, 4]),

    /**
     * Elevation of the Pane on click. Might get deprecated.
     * Values: 0, 1, 2, 3, 4.
     */
    activeElevation: PropTypes.oneOf([0, 1, 2, 3, 4]),

    /**
     * Can be a explicit border value or a boolean.
     * Values: true, muted, default.
     */
    border: StringAndBoolPropType,

    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderTop: StringAndBoolPropType,

    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderRight: StringAndBoolPropType,

    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderBottom: StringAndBoolPropType,

    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderLeft: StringAndBoolPropType,

    /**
     * Adds an identifier to the bottom of the layer
     * Defaults to theme color
     */
    identifier: PropTypes.string,

    /**
     * Theme provided by ThemeProvider.
     */
    theme: PropTypes.object.isRequired
  }

  getHoverElevationStyle = (hoverElevation, css) => {
    const { theme } = this.props
    if (!Number.isInteger(hoverElevation)) return {}

    return {
      transitionDuration: '150ms',
      transitionProperty: 'box-shadow, transform',
      transitionTimingFunction: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
      ':hover': {
        ...(css[':hover'] || {}),
        transform: 'translateY(-2px)',
        boxShadow: theme.getElevation(hoverElevation, this.getElevationColor())
      }
    }
  }

  getActiveElevationStyle = (activeElevation, css) => {
    const { theme } = this.props
    if (!Number.isInteger(activeElevation)) return {}

    return {
      ':active': {
        ...(css[':active'] || {}),
        transform: 'translateY(-1px)',
        boxShadow: theme.getElevation(activeElevation, this.getElevationColor())
      }
    }
  }

  getBorderSideProperty = ({ borderSideProperty, border }) => {
    const { theme } = this.props
    if (
      Object.prototype.hasOwnProperty.call(
        theme.colors.border,
        borderSideProperty
      )
    ) {
      return `1px solid ${theme.colors.border[borderSideProperty]}`
    } else if (borderSideProperty === true) {
      return `1px solid ${theme.colors.border.default}`
    } else if (borderSideProperty === false) {
      return null
    } else if (
      Object.prototype.hasOwnProperty.call(theme.colors.border, border)
    ) {
      return `1px solid ${theme.colors.border[border]}`
    } else if (border === true) {
      return `1px solid ${theme.colors.border.default}`
    }

    return borderSideProperty
  }

  getIdentifierStyle = (color, css) => {
    const { theme } = this.props

    if (theme.isThemeColor(color)) {
      return {
        '::after': {
          ...(css['::after'] || {}),
          content: `''`,
          height: 7.5,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          background: theme.colors.background[color]
        }
      }
    }
  }

  getBackgroundAppearance = (appearance, background) => {
    const { theme } = this.props
    switch (appearance) {
      case 'gradient':
        return theme.colors.background[theme.themeColor]
      case 'solid':
        return theme.colors.background[`${theme.themeColor}Tint`]
      case 'white':
        return 'white'
      default:
        return background
    }
  }

  getElevationColor = () => {
    const { theme, appearance, background } = this.props
    if (['gradient', 'solid'].includes(appearance)) {
      return theme.themeColor
    }
    return background
  }

  render() {
    const {
      theme,

      appearance,
      background,

      elevation,
      hoverElevation,
      activeElevation,

      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,

      identifier,

      css = {},
      ...props
    } = this.props

    const elevationStyle = theme.getElevation(
      elevation,
      this.getElevationColor()
    )
    const hoverElevationStyle = this.getHoverElevationStyle(hoverElevation, css)
    const activeElevationStyle = this.getActiveElevationStyle(
      activeElevation,
      css
    )
    const identifierStyle = this.getIdentifierStyle(identifier, css)

    const [_borderTop, _borderRight, _borderBottom, _borderLeft] = [
      borderTop,
      borderRight,
      borderBottom,
      borderLeft
    ].map(borderSideProperty =>
      this.getBorderSideProperty({ borderSideProperty, border })
    )

    const themedBackground = this.getBackgroundAppearance(
      appearance,
      background
    )

    return (
      <Box
        position="relative"
        borderTop={_borderTop}
        borderRight={_borderRight}
        borderBottom={_borderBottom}
        borderLeft={_borderLeft}
        boxShadow={elevationStyle}
        background={
          appearance ? themedBackground : theme.getBackground(background)
        }
        overflow={identifier ? 'hidden' : ''}
        css={{
          ...css,
          ...hoverElevationStyle,
          ...activeElevationStyle,
          ...identifierStyle
        }}
        {...props}
      />
    )
  }
}

export default withTheme(Pane)
