import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class CheckIcon extends PureComponent {
  render() {
    return (
      <Icon name="check" viewBox="0 0 24 24" {...this.props}>
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    )
  }
}
