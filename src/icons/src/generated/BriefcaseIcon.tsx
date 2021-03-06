import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BriefcaseIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="briefcase" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </Icon>
    )
  }
}
