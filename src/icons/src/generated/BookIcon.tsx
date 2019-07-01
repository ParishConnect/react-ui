import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BookIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="book" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </Icon>
    )
  }
}
