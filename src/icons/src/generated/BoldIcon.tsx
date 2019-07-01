import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BoldIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="bold" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      </Icon>
    )
  }
}
