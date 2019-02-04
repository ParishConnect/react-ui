import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class TriangleIcon extends PureComponent {
  render() {
    return (
      <Icon name="triangle" viewBox="0 0 24 24" {...this.props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </Icon>
    )
  }
}
