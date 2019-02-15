import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BookOpenIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="book-open" viewBox="0 0 24 24" {...this.props}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </Icon>
    )
  }
}
