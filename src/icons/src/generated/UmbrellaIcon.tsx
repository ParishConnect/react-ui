import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class UmbrellaIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="umbrella" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
      </Icon>
    )
  }
}
