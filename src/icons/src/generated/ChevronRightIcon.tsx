import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ChevronRightIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="chevron-right" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="9 18 15 12 9 6" />
      </Icon>
    )
  }
}
