import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class RadioIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="radio" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
      </Icon>
    )
  }
}
