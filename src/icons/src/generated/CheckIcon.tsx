import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CheckIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="check" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    )
  }
}
