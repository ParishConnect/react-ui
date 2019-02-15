import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ExternalLinkIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="external-link" viewBox="0 0 24 24" {...this.props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </Icon>
    )
  }
}
