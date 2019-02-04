import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class LinkedinIcon extends PureComponent {
  render() {
    return (
      <Icon name="linkedin" viewBox="0 0 24 24" {...this.props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </Icon>
    )
  }
}
