import * as React from 'react'
import * as PropTypes from 'prop-types'
import Box, { BoxType } from '@hennessyevan/aluminum-box'
import { withTheme } from '../../theme'
import { BackgroundColor, Elevation, ThemeType } from '../../constants'
import { WithThemeProps } from '../../theme/src/withTheme'

const StringAndBoolPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.bool
])

type StringAndBooleanType = string | boolean | undefined

export declare type PaneProps = BoxType &
  WithThemeProps & {
    /**
     * Values: 'gradient', 'solid', 'white'
     * --- Uses themeColor property
     */
    appearance?: 'gradient' | 'solid' | 'white'
    /**
     * Background property.
     * `tint1`, `tint2` etc. from `theme.colors.background` are available.
     */
    background?: BackgroundColor
    /**
     * Elevation of the Pane.
     * Values: 0, 1, 2, 3, 4.
     */
    elevation?: Elevation
    /**
     * Elevation of the Pane on hover. Might get deprecated.
     * Values: 0, 1, 2, 3, 4.
     */
    hoverElevation?: Elevation
    /**
     * Elevation of the Pane on click. Might get deprecated.
     * Values: 0, 1, 2, 3, 4.
     */
    activeElevation?: Elevation
    /**
     * Can be a explicit border value or a boolean.
     * Values: true, muted, default.
     */
    border?: StringAndBooleanType
    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderTop?: StringAndBooleanType
    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderRight?: StringAndBooleanType
    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderBottom?: StringAndBooleanType
    /**
     * Can be a explicit border value or a boolean.
     * Values: true, extraMuted, muted, default.
     */
    borderLeft?: StringAndBooleanType
    /**
     * Adds an identifier to the bottom of the layer
     * Defaults to theme color
     */
    identifier?: string
    /**
     * Sets the position of the identifier.
     */
    identifierPosition: 'top' | 'right' | 'bottom' | 'left'
    /**
     * Theme provided by ThemeProvider.
     */
    theme: ThemeType
    css: object
  }

class Pane extends React.PureComponent<PaneProps> {
  static propTypes = {
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
    identifier: StringAndBoolPropType,

    /**
     * Sets the position of the identifier.
     * Values:
     */
    identifierPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * Theme provided by ThemeProvider.
     */
    theme: PropTypes.object.isRequired
  }

  getHoverElevationStyle = (hoverElevation: number, css: object): object => {
    const { theme } = this.props
    if (!hoverElevation) {
      return {}
    }

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

  getActiveElevationStyle = (activeElevation: number, css: object): object => {
    const { theme } = this.props
    if (!Number.isInteger(activeElevation)) {
      return {}
    }

    return {
      ':active': {
        ...(css[':active'] || {}),
        transform: 'translateY(-1px)',
        boxShadow: theme.getElevation(activeElevation, this.getElevationColor())
      }
    }
  }

  getBorderSideProperty = ({
    borderSideProperty,
    border
  }: {
    borderSideProperty: StringAndBooleanType
    border: StringAndBooleanType
  }) => {
    const { theme } = this.props
    if (
      borderSideProperty &&
      Object.prototype.hasOwnProperty.call(
        theme.colors.border,
        borderSideProperty
      ) &&
      typeof borderSideProperty !== 'boolean'
    ) {
      return `1px solid ${theme.colors.border[borderSideProperty]}`
    }

    if (borderSideProperty === true) {
      return `1px solid ${theme.colors.border.default}`
    }
    if (borderSideProperty === false) {
      return
    }
    if (
      border &&
      Object.prototype.hasOwnProperty.call(theme.colors.border, border) &&
      typeof border !== 'boolean'
    ) {
      return `1px solid ${theme.colors.border[border]}`
    }
    if (typeof border === 'boolean' && border === true) {
      return `1px solid ${theme.colors.border.default}`
    }

    return borderSideProperty
  }

  getIdentifierStyle = (color: string, css: object): object => {
    const { theme, identifierPosition = 'bottom' } = this.props

    if (theme.isThemeColor(color)) {
      switch (identifierPosition) {
        case 'top':
          return {
            '::after': {
              ...(css['::after'] || {}),
              content: `''`,
              height: 9.5,
              width: '100%',
              position: 'absolute',
              top: -1,
              left: 0,
              background: theme.colors.background[color]
            }
          }
        case 'right':
          return {
            '::after': {
              ...(css['::after'] || {}),
              content: `''`,
              height: '100%',
              width: 9.5,
              position: 'absolute',
              top: 0,
              right: -1,
              background: theme.colors.background[color]
            }
          }
        case 'bottom':
          return {
            '::after': {
              ...(css['::after'] || {}),
              content: `''`,
              height: 9.5,
              width: '100%',
              position: 'absolute',
              bottom: -1,
              left: 0,
              background: theme.colors.background[color]
            }
          }
        case 'left':
          return {
            '::after': {
              ...(css['::after'] || {}),
              content: `''`,
              height: '100%',
              width: 9.5,
              position: 'absolute',
              top: 0,
              left: -1,
              background: theme.colors.background[color]
            }
          }
        default:
          console.warn(
            'Expected identifier value of one of [top, right, bottom, left] but got undefined'
          )
          return {}
      }
    }
    return {}
  }

  getBackgroundAppearance = (appearance: string, background: string) => {
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
    if (!appearance) {
      return background
    }
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
    const hoverElevationStyle = hoverElevation
      ? this.getHoverElevationStyle(hoverElevation, css)
      : {}
    const activeElevationStyle = activeElevation
      ? this.getActiveElevationStyle(activeElevation, css)
      : {}
    const identifierStyle = identifier
      ? this.getIdentifierStyle(identifier, css)
      : {}

    // tslint:disable-next-line variable-name
    const [_borderTop, _borderRight, _borderBottom, _borderLeft] = [
      borderTop,
      borderRight,
      borderBottom,
      borderLeft
    ].map(borderSideProperty =>
      this.getBorderSideProperty({ borderSideProperty, border })
    )

    const themedBackground = this.getBackgroundAppearance(
      appearance || '',
      background || ''
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

export default withTheme(Pane as any)
