import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowRightIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-right" viewBox="0 0 24 24" {...this.props}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </Icon>
    )
  }
}
