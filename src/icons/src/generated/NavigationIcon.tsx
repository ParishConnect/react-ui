import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class NavigationIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="navigation" viewBox="0 0 24 24" {...this.props}>
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </Icon>
    )
  }
}
