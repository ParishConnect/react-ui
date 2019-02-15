import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class GlobeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="globe" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </Icon>
    )
  }
}
