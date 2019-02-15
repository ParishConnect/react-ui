import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class XSquareIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="x-square" viewBox="0 0 24 24" {...this.props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </Icon>
    )
  }
}
