import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class DropletIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="droplet" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </Icon>
    )
  }
}
