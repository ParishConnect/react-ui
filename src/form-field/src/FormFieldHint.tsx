import * as React from 'react'
import { Paragraph } from '../../typography'
import { ParagraphProps } from '../../typography/src/Paragraph'

export default class FormFieldHint extends React.PureComponent<ParagraphProps> {
  render() {
    return <Paragraph marginTop={0} size={300} color="muted" {...this.props as any} />
  }
}
