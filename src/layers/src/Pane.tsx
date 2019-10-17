import Box, { BoxProps } from '@parishconnect/box'
import * as React from 'react'
import { Omit } from 'utility-types'
import { BackgroundColor, Elevation } from '../../constants'
import { ThemeContext } from '../../theme'
import { LiteralUnion } from '../../utils/utils'

type StringAndBooleanType = string | boolean | undefined
type PrePaneProps = Omit<BoxProps, ''>

export type PaneProps = PrePaneProps & {
  /**
   * Values: 'gradient', 'solid', 'white'
   * --- Uses themeColor property
   */
  appearance?:
    | LiteralUnion<'gradient' | 'solid' | 'white'>
    | LiteralUnion<'gradient' | 'solid' | 'white'>[]
  /**
   * Background property.
   * `tint1`, `tint2` etc. from `theme.colors.background` are available.
   */
  background?: BackgroundColor | BackgroundColor[]
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
  identifierPosition?: 'top' | 'right' | 'bottom' | 'left'
}

class Pane extends React.PureComponent<PaneProps> {
  public static contextType = ThemeContext

  getHoverElevationStyle = (hoverElevation: number, css: object): object => {
    const theme = this.context
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
    const theme = this.context
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
    const theme = this.context
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
    const { identifierPosition = 'bottom' } = this.props
    const theme = this.context

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
    const theme = this.context

    switch (appearance) {
      case 'gradient':
        return theme.colors.background[theme.themeColor]
      case 'solid':
        return theme.colors.background[`${theme.themeColor}Tint`]
      case 'white':
        return 'white'
      default:
        return theme.getBackground(background)
    }
  }

  getElevationColor = () => {
    const { appearance, background } = this.props
    const theme = this.context
    if (!appearance) {
      return background
    }
    if (['gradient', 'solid'].includes(appearance as string)) {
      return theme.themeColor
    }
    return background
  }

  render() {
    const {
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
    const theme = this.context

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

    const [_borderTop, _borderRight, _borderBottom, _borderLeft] = [
      borderTop,
      borderRight,
      borderBottom,
      borderLeft
    ].map(borderSideProperty =>
      this.getBorderSideProperty({ borderSideProperty, border })
    )

    const themedBackground = Array.isArray(background)
      ? background.map(b =>
          this.getBackgroundAppearance(
            (appearance as string) || '',
            (b as string) || ''
          )
        )
      : this.getBackgroundAppearance(
          (appearance as string) || '',
          (background as string) || ''
        )

    return (
      <Box
        position="relative"
        borderTop={_borderTop}
        borderRight={_borderRight}
        borderBottom={_borderBottom}
        borderLeft={_borderLeft}
        boxShadow={elevationStyle}
        background={themedBackground}
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

export default Pane
