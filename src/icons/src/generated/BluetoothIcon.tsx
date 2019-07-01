import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BluetoothIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="bluetooth" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
      </Icon>
    )
  }
}
