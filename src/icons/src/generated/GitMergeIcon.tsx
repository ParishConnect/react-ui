import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class GitMergeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="git-merge" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 0 0 9 9" />
      </Icon>
    )
  }
}
