import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { IconNames, IconSvgPaths16, IconSvgPaths20 } from '@blueprintjs/icons'
import { ThemeContext } from '../../theme'

export { IconNames }

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

  svgPaths16?: string[]
  svgPaths20?: string[]

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

  renderSvgPaths = (pathsSize: number, iconName: string): [] | null => {
    const svgPathsRecord =
      pathsSize === Icon.SIZE_STANDARD ? IconSvgPaths16 : IconSvgPaths20
    const pathStrings = svgPathsRecord[iconName]

    if (pathStrings === null) {
      return null
    }

    return pathStrings.map((d: any, i: number) => (
      <path key={i} d={d} fillRule="evenodd" />
    ))
  }

  render() {
    const {
      color = 'currentColor',
      icon,
      size = 16,
      title = this.props.icon,
      svgPaths16,
      svgPaths20,
      ...svgProps
    } = this.props
    const theme = this.context
    let { style = {} } = this.props

    // Choose which pixel grid is most appropriate for given icon size
    const pixelGridSize =
      size && size >= Icon.SIZE_LARGE ? Icon.SIZE_LARGE : Icon.SIZE_STANDARD
    const pathStrings = Icon.SIZE_STANDARD
      ? (svgPaths16 as string[])
      : (svgPaths20 as string[])
    const paths = pathStrings.map((d, i) => (
      <path key={i} d={d} fillRule="evenodd" />
    ))

    const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`

    style = { ...style, fill: theme.getIconColor(color) }

    return (
      <Box
        is="svg"
        {...svgProps}
        style={style}
        data-icon={icon}
        width={size}
        height={size}
        viewBox={viewBox}
      >
        {title ? <title>{title}</title> : null}
        {paths}
      </Box>
    )
  }
}

export default Icon
