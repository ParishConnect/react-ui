import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ChevronsUpIcon extends PureComponent {
  render() {
    return (
      <Icon name="chevrons-up" viewBox="0 0 24 24" {...this.props}>
        <polyline points="17 11 12 6 7 11" />
        <polyline points="17 18 12 13 7 18" />
      </Icon>
    )
  }
}
