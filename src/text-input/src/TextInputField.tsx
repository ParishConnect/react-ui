import * as React from 'react'
import { splitBoxProps } from '@parishconnect/box'
import { FormField } from '../../form-field'
import TextInput, { TextInputProps } from './TextInput'
import { FormFieldProps } from '../../form-field/src/FormField'
import { Assign } from 'utility-types'

let idCounter = 0

export interface TextInputFieldProps
  extends Assign<TextInputProps, FormFieldProps> {
  /**
   * The label used above the input element.
   */
  label: React.ReactNode
  /**
   * Passed on the label as a htmlFor prop.
   */
  labelFor?: string
  /**
   * Wether or not show a asterix after the label.
   */
  isRequired?: boolean
  /**
   * A optional description of the field under the label, above the input element.
   */
  description?: React.ReactNode
  /**
   * A optional hint under the input element.
   */
  hint?: React.ReactNode
  /**
   * If a validation message is passed it is shown under the input element
   * and above the hint.
   */
  validationMessage?: React.ReactNode
  /**
   * The height of the input element.
   */
  inputHeight?: number
  /**
   * The width of the input width.
   */
  inputWidth?: number | string
}

export default class TextInputField extends React.PureComponent<
  TextInputFieldProps
> {
  static defaultProps = {
    /**
     * The input width should be as wide as the form field.
     */
    inputWidth: '100%',
    inputHeight: 32
  }

  state = {
    id: (this.props.id || idCounter++).toString()
  }

  render() {
    const {
      // We are using the id from the state
      // tslint:disable-next-line:no-unused
      id: unusedId,

      // FormField props
      hint,
      label,
      description,
      validationMessage,

      // TextInput props
      inputHeight = 32,
      inputWidth = '100%',
      disabled,
      required,
      isInvalid,
      appearance,
      placeholder,
      spellCheck,

      // Rest props are spread on the FormField
      ...props
    } = this.props

    const id = `TextInputField-${this.state.id}`

    /**
     * Split the wrapper props from the input props.
     */
    const { matchedProps, remainingProps } = splitBoxProps(props)

    return (
      <FormField
        marginBottom={24}
        label={label}
        isRequired={required}
        hint={hint}
        description={description}
        validationMessage={validationMessage}
        labelFor={id}
        {...matchedProps}
      >
        <TextInput
          id={id}
          width={inputWidth}
          height={inputHeight}
          disabled={disabled}
          required={required}
          isInvalid={isInvalid}
          appearance={appearance}
          placeholder={placeholder}
          spellCheck={spellCheck}
          {...remainingProps}
        />
      </FormField>
    )
  }
}
