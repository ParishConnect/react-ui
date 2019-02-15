import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class GitCommitIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="git-commit" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="4" />
        <line x1="1.05" y1="12" x2="7" y2="12" />
        <line x1="17.01" y1="12" x2="22.96" y2="12" />
      </Icon>
    )
  }
}
