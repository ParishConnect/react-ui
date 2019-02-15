import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CloudLightningIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="cloud-lightning" viewBox="0 0 24 24" {...this.props}>
        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
        <polyline points="13 11 9 17 15 17 11 23" />
      </Icon>
    )
  }
}
