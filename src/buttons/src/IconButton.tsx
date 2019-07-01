import * as React from 'react'
import { ThemeContext } from '../../theme'
import Button, { ButtonProps } from './Button'

export interface IconButtonProps extends ButtonProps {
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
  icon?: any
  /**
   * Specifies an explicit icon size instead of the default value
   */
  iconSize?: number
  /**
   * Forcefully set the active state of a button.
   * Useful in conjuction with a Popover.
   */
  isActive?: boolean
  /**
   * When true, the button is disabled.
   * isLoading also sets the button to disabled.
   */
  disabled?: boolean
  /**
   * Overrides the fill color for the icon
   */
  fillColor?: string
  /**
   * Class name passed to the button.
   * Only use if you know what you are doing.
   */
  classname?: boolean
}

class IconButton extends React.PureComponent<IconButtonProps> {
  public static contextType = ThemeContext

  static defaultProps = {
    intent: 'none',
    appearance: 'default',
    height: 32
  }

  getIconColor = () => {
    const { appearance = 'default', fillColor } = this.props
    const theme = this.context
    if (fillColor) return fillColor
    switch (appearance) {
      case 'overlay':
        return theme.getIconColor('white')
      case 'primary':
        return 'white'
      default:
        return 'currentColor'
    }
  }

  render() {
    const {
      appearance = 'default',
      icon: Icon,
      iconSize,
      height = 32,
      intent = 'none',
      paddingLeft,
      paddingRight,
      ...props
    } = this.props
    const theme = this.context
    const size = iconSize || theme.getIconSizeForIconButton(height)

    return (
      <Button
        appearance={appearance}
        intent={intent}
        height={height}
        width={height}
        paddingLeft={0}
        paddingRight={0}
        display="flex"
        justifyContent="center"
        {...props as any}
      >
        <Icon
          size={size}
          style={{ stroke: this.getIconColor() }}
          color={this.getIconColor()}
        />
      </Button>
    )
  }
}

export default IconButton
