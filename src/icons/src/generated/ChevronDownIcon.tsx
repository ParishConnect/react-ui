import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ChevronDownIcon extends PureComponent {
  render() {
    return (
      <Icon name="chevron-down" viewBox="0 0 24 24" {...this.props}>
        <polyline points="6 9 12 15 18 9" />
      </Icon>
    )
  }
}
