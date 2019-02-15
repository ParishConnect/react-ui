import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TrashIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="trash" viewBox="0 0 24 24" {...this.props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </Icon>
    )
  }
}
