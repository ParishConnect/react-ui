import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ChevronUpIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="chevron-up" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="18 15 12 9 6 15" />
      </Icon>
    )
  }
}
