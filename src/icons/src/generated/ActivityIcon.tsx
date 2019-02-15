import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ActivityIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="activity" viewBox="0 0 24 24" {...this.props}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </Icon>
    )
  }
}
