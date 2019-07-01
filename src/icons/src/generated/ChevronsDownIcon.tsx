import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ChevronsDownIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="chevrons-down" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="7 13 12 18 17 13" />
        <polyline points="7 6 12 11 17 6" />
      </Icon>
    )
  }
}
