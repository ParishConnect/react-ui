import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class FolderMinusIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="folder-minus" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </Icon>
    )
  }
}
