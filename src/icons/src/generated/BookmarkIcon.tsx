import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BookmarkIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="bookmark" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </Icon>
    )
  }
}
