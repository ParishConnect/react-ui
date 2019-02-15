import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class RewindIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="rewind" viewBox="0 0 24 24" {...this.props}>
        <polygon points="11 19 2 12 11 5 11 19" />
        <polygon points="22 19 13 12 22 5 22 19" />
      </Icon>
    )
  }
}
