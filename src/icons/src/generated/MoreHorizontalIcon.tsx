import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MoreHorizontalIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="more-horizontal" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </Icon>
    )
  }
}
