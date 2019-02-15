import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MoreVerticalIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="more-vertical" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </Icon>
    )
  }
}
