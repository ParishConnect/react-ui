import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class Link2Icon extends PureComponent {
  render() {
    return (
      <Icon name="link-2" viewBox="0 0 24 24" {...this.props}>
        <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </Icon>
    )
  }
}
