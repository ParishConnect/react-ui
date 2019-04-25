import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import * as React from 'react'
import { ThemeContext } from '../../theme/index'
import { getIconColor } from '../../theme/src/default-theme/theme-helpers/index'

export interface IconProps extends BoxProps {
  /**
   * Color of icon. Equivalent to setting CSS `stroke|fill` property.
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
  style?: object
}

class Icon extends React.PureComponent<IconProps> {
  static contextType = ThemeContext
  static SIZE_STANDARD = 16
  static SIZE_LARGE = 20

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
      isSolid,
      ...svgProps
    } = this.props
    let { style = {} } = this.props
    const theme = this.context

    const viewBox = `0 0 24 24`

    style = {
      ...style,
      stroke: getIconColor(color),
      fill: isSolid ? getIconColor(color) : ''
    }

    return (
      <Box
        is="svg"
        viewBox={viewBox}
        fill="none"
        {...svgProps}
        style={style}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-icon={name}
        width={size}
        height={size}
      >
        {name ? <title>{name}</title> : null}
        {children}
      </Box>
    )
  }
}

export default Icon
