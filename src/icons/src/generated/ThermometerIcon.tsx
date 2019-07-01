import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ThermometerIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="thermometer" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </Icon>
    )
  }
}
