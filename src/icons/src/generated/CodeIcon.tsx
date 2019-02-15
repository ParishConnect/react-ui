import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CodeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="code" viewBox="0 0 24 24" {...this.props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </Icon>
    )
  }
}
