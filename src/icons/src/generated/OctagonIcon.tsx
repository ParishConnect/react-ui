import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class OctagonIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="octagon" viewBox="0 0 24 24" {...this.props as any}>
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      </Icon>
    )
  }
}
