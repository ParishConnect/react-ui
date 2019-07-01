import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BellIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="bell" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </Icon>
    )
  }
}
