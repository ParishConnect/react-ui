import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ChevronsRightIcon extends PureComponent {
  render() {
    return (
      <Icon name="chevrons-right" viewBox="0 0 24 24" {...this.props}>
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
      </Icon>
    )
  }
}
