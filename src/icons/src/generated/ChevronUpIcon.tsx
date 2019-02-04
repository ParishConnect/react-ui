import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ChevronUpIcon extends PureComponent {
  render() {
    return (
      <Icon name="chevron-up" viewBox="0 0 24 24" {...this.props}>
        <polyline points="18 15 12 9 6 15" />
      </Icon>
    )
  }
}
