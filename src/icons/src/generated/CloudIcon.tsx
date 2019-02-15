import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CloudIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="cloud" viewBox="0 0 24 24" {...this.props}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </Icon>
    )
  }
}
