import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ThumbsUpIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="thumbs-up" viewBox="0 0 24 24" {...this.props}>
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </Icon>
    )
  }
}
