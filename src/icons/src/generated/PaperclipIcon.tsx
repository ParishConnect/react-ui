import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class PaperclipIcon extends PureComponent {
  render() {
    return (
      <Icon name="paperclip" viewBox="0 0 24 24" {...this.props}>
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </Icon>
    )
  }
}