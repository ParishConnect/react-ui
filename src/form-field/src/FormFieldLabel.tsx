import * as React from 'react'
import { Label } from '../../typography'
import { TextProps } from '../../typography/src/Text'

export interface FormFieldLabelProps extends TextProps {
  /**
   * Whether or not tho show an asterix after the label.
   */
  isAstrixShown?: boolean
}

export default class FormFieldLabel extends React.PureComponent<
  FormFieldLabelProps
> {
  render() {
    const { children, isAstrixShown, ...props } = this.props
    return (
      <Label display="block" {...props as any}>
        {children}{' '}
        {isAstrixShown && <span title="This field is required.">*</span>}
      </Label>
    )
  }
}
