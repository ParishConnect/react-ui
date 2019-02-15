import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TvIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="tv" viewBox="0 0 24 24" {...this.props}>
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </Icon>
    )
  }
}
