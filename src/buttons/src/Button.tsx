import * as React from 'react'
import { IntentType } from '../../constants'
import { Spinner } from '../../spinner'
import { ThemeContext } from '../../theme'
import { Text } from '../../typography'
import { TextProps } from '../../typography/src/Text'

export interface ButtonProps extends Omit<TextProps, 'appearance'> {
  /**
   * The intent of the button.
   */
  intent?: IntentType
  /**
   * The appearance of the button.
   */
  appearance?: 'default' | 'minimal' | 'primary' | 'overlay'
  /**
   * When true, show a loading spinner before the children.
   * This also disables the button.
   */
  isLoading?: boolean
  /**
   * Creates a round button
   */
  round?: boolean
  /**
   * Forcefully set the active state of a button.
   * Useful in conjuction with a Popover.
   */
  isActive?: boolean
  /**
   * Sets an icon before the text. Can be any icon from Evergreen.
   */
  iconBefore?: any
  /**
   * Sets an icon after the text. Can be any icon from Evergreen.
   */
  iconAfter?: any
  /**
   * When true, the button is disabled.
   * isLoading also sets the button to disabled.
   */
  disabled?: boolean

  /**
   * When true, text is a bolder option
   */
  strong?: boolean

  /**
   * When true, text is uppercase
   */
  isUppercase?: boolean
}

class Button extends React.PureComponent<ButtonProps> {
  public static contextType = ThemeContext

  public static defaultProps = {
    appearance: 'default',
    height: 32,
    intent: 'none',
    isActive: false,
    paddingBottom: 0,
    paddingTop: 0
  }

  render() {
    const {
      intent = 'none',
      height = 32,
      isActive = false,
      children,
      disabled,
      appearance = 'default',
      isLoading,
      round,
      strong = this.props.appearance === 'primary',
      isUppercase,

      // Paddings
      paddingRight,
      paddingLeft,
      paddingTop = 0,
      paddingBottom = 0,

      // Icons
      iconBefore: IconBefore = () => <></>,
      iconAfter: IconAfter = () => <></>,

      color,
      css,

      ...props
    } = this.props
    const theme = this.context

    const buttonCSS = theme.getButtonCSS(appearance, intent, theme.themeColor)
    const textSize = theme.getTextSizeForControlHeight(height)

    const borderRadius = round
      ? height
      : theme.getBorderRadiusForControlHeight(height)
    const iconSize = theme.getIconSizeForButton(height)

    const pr =
      paddingRight !== undefined ? paddingRight : Math.round(height / 2)
    const pl = paddingLeft !== undefined ? paddingLeft : Math.round(height / 2)

    return (
      <Text
        is="button"
        borderTopRightRadius={borderRadius}
        borderBottomRightRadius={borderRadius}
        borderTopLeftRadius={borderRadius}
        borderBottomLeftRadius={borderRadius}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        paddingRight={pr}
        paddingLeft={pl}
        marginLeft={0} // Removes weird margins in Safari
        marginRight={0} // Removes weird margins in Safari
        marginTop={0} // Removes weird margins in Safari
        marginBottom={0} // Removes weird margins in Safari
        size={textSize}
        type="button"
        color={color || ''} // Prevent the Text color overriding the emotion appearanceStyle color
        height={height}
        lineHeight={`${height}px`}
        {...(isActive ? { 'data-active': true } : {})}
        position="relative"
        fontFamily="ui"
        fontWeight={strong ? 600 : 500}
        textTransform={isUppercase ? 'uppercase' : 'none'}
        display="inline-flex"
        alignItems="center"
        flexWrap="nowrap"
        css={{ ...buttonCSS, ...css }}
        {...props}
        disabled={disabled || isLoading}
      >
        {isLoading && (
          <Spinner
            marginLeft={-Math.round(height / 8)}
            marginRight={Math.round(height / 4)}
            size={Math.round(height / 2)}
          />
        )}
        {typeof IconBefore === 'object'
          ? IconBefore
          : (
              <IconBefore
                size={iconSize}
                marginLeft={-Math.round(pl * 0.2)}
                marginRight={Math.round(iconSize * 0.7)}
              />
            ) || null}
        {children}
        {typeof IconAfter === 'object'
          ? IconAfter
          : (
              <IconAfter
                size={iconSize}
                marginRight={-Math.round(pl * 0.2)}
                marginLeft={Math.round(iconSize * 0.7)}
              />
            ) || null}
      </Text>
    )
  }
}

export default Button
