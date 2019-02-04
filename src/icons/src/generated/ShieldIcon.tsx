import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ShieldIcon extends PureComponent {
  render() {
    return (
      <Icon name="shield" viewBox="0 0 24 24" {...this.props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </Icon>
    )
  }
}
