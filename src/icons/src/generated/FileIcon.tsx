import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class FileIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="file" viewBox="0 0 24 24" {...this.props}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </Icon>
    )
  }
}
