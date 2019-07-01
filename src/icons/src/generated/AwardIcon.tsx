import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class AwardIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="award" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </Icon>
    )
  }
}
