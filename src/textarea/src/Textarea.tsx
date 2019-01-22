import * as React from 'react'
import cx from 'classnames'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'
import { TextProps } from '../../typography/src/Text'

export interface TextareaProps extends TextProps {
  /**
   * Makes the textarea element required.
   */
  required?: boolean

  /**
   * Makes the textarea element disabled.
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
   * Allow the Grammarly browser extension to attach to the backing textarea.
   */
  grammarly?: boolean

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

class Textarea extends React.PureComponent<TextareaProps> {
  static contextType = ThemeContext
  static defaultProps = {
    appearance: 'default',
    width: '100%',
    disabled: false,
    isInvalid: false,
    spellCheck: true,
    grammarly: false
  }

  static styles = {
    minHeight: 80,
    paddingX: 10,
    paddingY: 8
  }

  render() {
    const {
      className,

      css,
      width,
      height,
      disabled,
      required,
      isInvalid,
      appearance,
      placeholder,
      spellCheck,
      grammarly,
      ...props
    } = this.props
    const theme = this.context
    const themedClassName = theme.getTextareaClassName(appearance)

    return (
      <Text
        is="textarea"
        className={cx(themedClassName, className)}
        size={400}
        width={width}
        height={height}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        paddingLeft={Math.round(height / 3.2)}
        paddingRight={Math.round(height / 3.2)}
        borderRadius={3}
        spellCheck={spellCheck}
        aria-invalid={isInvalid}
        data-gramm_editor={grammarly}
        {...(disabled ? { color: 'muted' } : {})}
        css={css}
        {...Textarea.styles}
        {...props}
      />
    )
  }
}

export default Textarea
