import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class HexagonIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="hexagon" viewBox="0 0 24 24" {...this.props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </Icon>
    )
  }
}
