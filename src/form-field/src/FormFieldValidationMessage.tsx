import * as React from 'react'
import { Paragraph } from '../../typography'
import { ThemeContext } from '../../theme'
import { Icon } from '../../icon'
import { Pane, PaneProps } from '../../layers'

class FormFieldValidationMessage extends React.PureComponent<PaneProps> {
  static contextType = ThemeContext
  render() {
    const { children, ...props } = this.props
    const theme = this.context
    return (
      <Pane display="flex" {...props} theme={theme}>
        <Icon
          icon="error"
          color="danger"
          marginTop={1}
          size={14}
          marginRight={8}
        />
        <Paragraph marginTop={0} size={300} color="danger" role="alert">
          {children}
        </Paragraph>
      </Pane>
    )
  }
}

export default FormFieldValidationMessage
