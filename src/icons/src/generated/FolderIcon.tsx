import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class FolderIcon extends PureComponent {
  render() {
    return (
      <Icon name="folder" viewBox="0 0 24 24" {...this.props}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </Icon>
    )
  }
}