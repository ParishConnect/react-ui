import * as React from 'react'
import { ThemeContext } from '../../theme'
import { Text } from '../../typography'
import { TextProps } from '../../typography/src/Text'

export interface TextInputProps extends Omit<TextProps, 'appearance'> {
  /**
   * Makes the input element required.
   */
  required?: boolean
  /**
   * Makes the input element disabled.
   */
  disabled?: boolean
  /**
   * Sets visual styling to be invalid.
   */
  isInvalid?: boolean
  /**
   * Use the native spell check functionality of the browser.
   */
  spellCheck?: boolean
  /**
   * The placeholder text when there is no value present.
   */
  placeholder?: string
  /**
   * The appearance of the TextInput.
   */
  appearance?: string
  /**
   * The width of the TextInput.
   */
  width?: string | number
  height?: number
}

class TextInput extends React.PureComponent<TextInputProps> {
  static contextType = ThemeContext
  static defaultProps = {
    appearance: 'default',
    height: 32,
    width: 280,
    disabled: false,
    isInvalid: false,
    spellCheck: true
  }

  render() {
    const {
      css,
      width,
      height = 32,
      disabled = false,
      required,
      isInvalid = false,
      appearance = 'default',
      placeholder,
      spellCheck = true,
      ...props
    } = this.props
    const theme = this.context
    const themedCSS = theme.getTextInputCSS(appearance, theme.themeColor)
    const textSize = theme.getTextSizeForControlHeight(height)
    const borderRadius = theme.getBorderRadiusForControlHeight(height)

    return (
      <Text
        is="input"
        type="text"
        size={textSize}
        width={width}
        height={height}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        paddingLeft={Math.round(height / 3.2)}
        paddingRight={Math.round(height / 3.2)}
        borderRadius={borderRadius}
        spellCheck={spellCheck}
        aria-invalid={isInvalid}
        {...(disabled ? { color: 'muted' } : {})}
        css={{ ...themedCSS, ...css }}
        {...props}
      />
    )
  }
}

export default TextInput
