import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ChevronsDownIcon extends PureComponent {
  render() {
    return (
      <Icon name="chevrons-down" viewBox="0 0 24 24" {...this.props}>
        <polyline points="7 13 12 18 17 13" />
        <polyline points="7 6 12 11 17 6" />
      </Icon>
    )
  }
}
