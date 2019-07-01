import * as React from 'react'
import Box, { BoxProps } from '@parishconnect/box'
import FormFieldLabel from './FormFieldLabel'
import FormFieldDescription from './FormFieldDescription'
import FormFieldValidationMessage from './FormFieldValidationMessage'
import FormFieldHint from './FormFieldHint'

export interface FormFieldProps extends BoxProps<'div'> {
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
   * Props passed to the field label
   */
  labelProps?: Partial<BoxProps<'label'>>
}

export default class FormField extends React.PureComponent<FormFieldProps> {
  static defaultProps = {
    labelProps: {
      size: 400
    }
  }

  render() {
    const {
      hint,
      label,
      labelFor,
      children,
      isRequired,
      labelProps,
      description,
      validationMessage,
      ...props
    } = this.props

    return (
      <Box {...(props as any)}>
        <FormFieldLabel
          htmlFor={labelFor}
          isAstrixShown={isRequired}
          marginBottom={description ? 0 : 4}
          {...(labelProps as any)}
        >
          {label}
        </FormFieldLabel>
        {typeof description === 'string' ? (
          <FormFieldDescription marginBottom={4}>
            {description}
          </FormFieldDescription>
        ) : (
          description
        )}
        {children}
        {typeof validationMessage === 'string' ? (
          <FormFieldValidationMessage marginTop={8}>
            {validationMessage}
          </FormFieldValidationMessage>
        ) : (
          validationMessage
        )}
        {typeof hint === 'string' ? (
          <FormFieldHint marginTop={6}>{hint}</FormFieldHint>
        ) : (
          hint
        )}
      </Box>
    )
  }
}
