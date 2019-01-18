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
   * Name of a Blueprint UI icon, or an icon element, to render.
   * This prop is required because it determines the content of the component, but it can
   * be explicitly set to falsy values to render nothing.
   *
   * - If `null` or `undefined` or `false`, this component will render nothing.
   * - If given an `IconName` (a string literal union of all icon names),
   *   that icon will be rendered as an `<svg>` with `<path>` tags.
   * - If given a `JSX.Element`, that element will be rendered and _all other props on this component are ignored._
   *   This type is supported to simplify usage of this component in other Blueprint components.
   *   As a consumer, you should never use `<Icon icon={<element />}` directly; simply render `<element />` instead.
   */
  icon: string
  /**
   * Size of the icon, in pixels.
   * Blueprint contains 16px and 20px SVG icon images,
   * and chooses the appropriate resolution based on this prop.
   */
  size: number
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
      color,
      icon,
      size,
      title = this.props.icon,
      ...svgProps
    } = this.props
    const theme = this.context
    let { style = {} } = this.props

    if (icon === null) {
      return null
    }
    if (typeof icon !== 'string') {
      return icon
    }

    // Choose which pixel grid is most appropriate for given icon size
    const pixelGridSize =
      size >= Icon.SIZE_LARGE ? Icon.SIZE_LARGE : Icon.SIZE_STANDARD
    const paths = this.renderSvgPaths(pixelGridSize, icon)
    if (paths === null) {
      return null
    }

    const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`

    if (color !== null) {
      style = { ...style, fill: theme.getIconColor(color) }
    }

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
