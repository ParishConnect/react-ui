import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class Edit3Icon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="edit-3" viewBox="0 0 24 24" {...this.props}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </Icon>
    )
  }
}
