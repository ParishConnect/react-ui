import * as React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'
import { TextProps } from '../../typography/src/Text'

export interface TextareaProps extends Omit<TextProps, 'apperance'> {
  height?: number
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
   * When true, textarea grows height to fit text
   */
  autoresize?: boolean

  /**
   * Component used to render styles to the textarea
   * @default Text
   */
  component?: any
}

class Textarea extends React.PureComponent<TextareaProps> {
  static contextType = ThemeContext
  static defaultProps = {
    appearance: 'default',
    width: '100%',
    disabled: false,
    isInvalid: false,
    spellCheck: true,
    grammarly: false,
    autoresize: false
  }

  static styles = {
    paddingX: 10,
    paddingY: 8,
    minHeight: 80
  }

  static editorStyles = {
    paddingX: 0
  }

  render() {
    const {
      css,
      width,
      height = 0,
      disabled,
      required,
      isInvalid,
      appearance,
      placeholder,
      spellCheck,
      grammarly,
      autoresize,
      component: RenderComponent = Text,
      minHeight = this.props.autoresize ? 'initial' : 80,
      paddingX = this.props.appearance === 'editor-title' && 0,
      ...props
    } = this.props
    const theme = this.context
    const themedCSS = theme.getTextareaCSS(appearance)

    const renderStyles =
      appearance === 'editor-title' ? Textarea.editorStyles : Textarea.styles

    return (
      <RenderComponent
        is={autoresize ? TextareaAutosize : 'textarea'}
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
        css={{ ...themedCSS, ...css, resize: autoresize ? 'none' : '' }}
        {...renderStyles}
        {...props}
      />
    )
  }
}

export default Textarea
