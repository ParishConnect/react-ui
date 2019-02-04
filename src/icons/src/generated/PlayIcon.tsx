import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class PlayIcon extends PureComponent {
  render() {
    return (
      <Icon name="play" viewBox="0 0 24 24" {...this.props}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </Icon>
    )
  }
}
