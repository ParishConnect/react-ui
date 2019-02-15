import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ClipboardIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="clipboard" viewBox="0 0 24 24" {...this.props}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </Icon>
    )
  }
}
