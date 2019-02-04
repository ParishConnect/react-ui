import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class CastIcon extends PureComponent {
  render() {
    return (
      <Icon name="cast" viewBox="0 0 24 24" {...this.props}>
        <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
        <line x1="2" y1="20" x2="2" y2="20" />
      </Icon>
    )
  }
}
