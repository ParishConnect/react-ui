import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class GitBranchIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="git-branch" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </Icon>
    )
  }
}
