import * as React from 'react'
import cx from 'classnames'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'
import { TextProps } from '../../typography/src/Text'

export interface TextInputProps extends TextProps {
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
  /**
   * Class name passed to the button.
   * Only use if you know what you are doing.
   */
  className?: string
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
      className,

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
    const themedClassName = theme.getTextInputClassName(appearance)
    const textSize = theme.getTextSizeForControlHeight(height)
    const borderRadius = theme.getBorderRadiusForControlHeight(height)

    return (
      <Text
        is="input"
        className={cx(themedClassName, className)}
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
        css={css}
        {...props}
      />
    )
  }
}

export default TextInput
