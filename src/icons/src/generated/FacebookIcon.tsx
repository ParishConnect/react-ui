import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class FacebookIcon extends PureComponent {
  render() {
    return (
      <Icon name="facebook" viewBox="0 0 24 24" {...this.props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </Icon>
    )
  }
}
