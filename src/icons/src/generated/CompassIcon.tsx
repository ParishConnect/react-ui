import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CompassIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="compass" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </Icon>
    )
  }
}
