import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class MousePointerIcon extends PureComponent {
  render() {
    return (
      <Icon name="mouse-pointer" viewBox="0 0 24 24" {...this.props}>
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </Icon>
    )
  }
}
