import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ChevronsLeftIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="chevrons-left" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
      </Icon>
    )
  }
}
