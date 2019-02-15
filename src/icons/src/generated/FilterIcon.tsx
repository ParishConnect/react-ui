import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class FilterIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="filter" viewBox="0 0 24 24" {...this.props}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </Icon>
    )
  }
}
