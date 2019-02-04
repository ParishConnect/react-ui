import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { ThemeContext } from '../../theme'

/**
 * This implementation is a remix of the Icon component in Blueprintjs:
 * https://github.com/palantir/blueprint/blob/813e93f2/packages/core/src/components/icon/icon.tsx#L15
 * Refer to the LICENSE for BlueprintJS here: https://github.com/palantir/blueprint/blob/develop/LICENSE
 */

export interface IconProps extends BoxProps {
  /**
   * Color of icon. Equivalent to setting CSS `fill` property.
   */
  color?: string
  /**
   * Name of a feather icon or aluminum UI icon
   */
  name?: string
  /**
   * Size of the icon, in pixels.
   * Blueprint contains 16px and 20px SVG icon images,
   * and chooses the appropriate resolution based on this prop.
   */
  size?: number
  /**
   * Description string.
   * Browsers usually render this as a tooltip on hover, whereas screen
   * readers will use it for aural feedback.
   * By default, this is set to the icon's name for accessibility.
   */
  title?: string
  /**
   * CSS style properties.
   */
  style?: React.CSSProperties
}

class Icon extends React.PureComponent<IconProps> {
  static SIZE_STANDARD = 16
  static SIZE_LARGE = 20

  public static contextType = ThemeContext

  static defaultProps = {
    size: 16,
    color: 'currentColor'
  }

  render() {
    const {
      color = 'currentColor',
      children,
      name,
      size = 16,
      ...svgProps
    } = this.props
    const theme = this.context
    let { style = {} } = this.props

    const viewBox = `0 0 24 24`

    style = { ...style, stroke: theme.getIconColor(color) }

    return (
      <Box
        is="svg"
        {...svgProps}
        fill="none"
        style={style}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        data-icon={name}
        width={size}
        height={size}
        viewBox={viewBox}
      >
        {name ? <title>{name}</title> : null}
        {children}
      </Box>
    )
  }
}

export default Icon
