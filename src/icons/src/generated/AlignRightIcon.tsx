import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class AlignRightIcon extends PureComponent {
  render() {
    return (
      <Icon name="align-right" viewBox="0 0 24 24" {...this.props}>
        <line x1="21" y1="10" x2="7" y2="10" />
        <line x1="21" y1="6" x2="3" y2="6" />
        <line x1="21" y1="14" x2="3" y2="14" />
        <line x1="21" y1="18" x2="7" y2="18" />
      </Icon>
    )
  }
}
