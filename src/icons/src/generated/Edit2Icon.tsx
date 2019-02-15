import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class Edit2Icon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="edit-2" viewBox="0 0 24 24" {...this.props}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </Icon>
    )
  }
}
