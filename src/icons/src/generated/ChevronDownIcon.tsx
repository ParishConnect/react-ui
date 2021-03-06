import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ChevronDownIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="chevron-down" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="6 9 12 15 18 9" />
      </Icon>
    )
  }
}
