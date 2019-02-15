import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class FileTextIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="file-text" viewBox="0 0 24 24" {...this.props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </Icon>
    )
  }
}
