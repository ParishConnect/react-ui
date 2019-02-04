import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ChevronRightIcon extends PureComponent {
  render() {
    return (
      <Icon name="chevron-right" viewBox="0 0 24 24" {...this.props}>
        <polyline points="9 18 15 12 9 6" />
      </Icon>
    )
  }
}
