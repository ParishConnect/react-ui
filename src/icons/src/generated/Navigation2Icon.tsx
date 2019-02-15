import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class Navigation2Icon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="navigation-2" viewBox="0 0 24 24" {...this.props}>
        <polygon points="12 2 19 21 12 17 5 21 12 2" />
      </Icon>
    )
  }
}
