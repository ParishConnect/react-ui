import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class DiscIcon extends PureComponent {
  render() {
    return (
      <Icon name="disc" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </Icon>
    )
  }
}