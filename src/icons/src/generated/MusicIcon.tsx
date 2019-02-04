import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class MusicIcon extends PureComponent {
  render() {
    return (
      <Icon name="music" viewBox="0 0 24 24" {...this.props}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </Icon>
    )
  }
}
