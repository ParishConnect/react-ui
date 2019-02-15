import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowLeftIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-left" viewBox="0 0 24 24" {...this.props}>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </Icon>
    )
  }
}
