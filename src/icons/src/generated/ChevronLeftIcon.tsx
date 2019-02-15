import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ChevronLeftIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="chevron-left" viewBox="0 0 24 24" {...this.props}>
        <polyline points="15 18 9 12 15 6" />
      </Icon>
    )
  }
}
