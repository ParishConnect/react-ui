import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class LayersIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="layers" viewBox="0 0 24 24" {...this.props}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </Icon>
    )
  }
}
