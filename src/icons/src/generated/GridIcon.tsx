import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class GridIcon extends PureComponent {
  render() {
    return (
      <Icon name="grid" viewBox="0 0 24 24" {...this.props}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </Icon>
    )
  }
}
