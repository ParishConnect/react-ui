import * as React from 'react'
import { splitBoxProps } from '@hennessyevan/aluminum-box'
import { FormField } from '../../form-field'
import Select, { SelectProps } from './Select'
import { Assign } from 'utility-types'
import { FormFieldProps } from '../../form-field/src/FormField'

let idCounter = 0

export interface TextInputFieldProps
  extends Assign<SelectProps, FormFieldProps> {
  /**
   * The label used above the input element.
   */
  label?: React.ReactNode

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

interface TextInputFieldState {
  id: string
}

export default class TextInputField extends React.PureComponent<
  TextInputFieldProps,
  TextInputFieldState
> {
  static defaultProps = {
    /**
     * The input width should be as wide as the form field.
     */
    inputWidth: '100%',
    inputHeight: 32
  }

  state: TextInputFieldState = {
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
      inputHeight,
      inputWidth,
      disabled,
      required,
      isInvalid,
      appearance,

      // Rest props are spread on the FormField
      ...props
    } = this.props

    const id = `SelectField-${this.state.id}`

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
        <Select
          id={id}
          width={inputWidth}
          height={inputHeight}
          disabled={disabled}
          required={required}
          isInvalid={isInvalid}
          appearance={appearance}
          {...remainingProps}
        />
      </FormField>
    )
  }
}
