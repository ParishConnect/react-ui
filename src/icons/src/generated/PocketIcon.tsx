import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PocketIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="pocket" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
        <polyline points="8 10 12 14 16 10" />
      </Icon>
    )
  }
}
