import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PlusIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="plus" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </Icon>
    )
  }
}
