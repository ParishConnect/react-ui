import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MonitorIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="monitor" viewBox="0 0 24 24" {...this.props}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </Icon>
    )
  }
}
