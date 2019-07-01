import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PrinterIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="printer" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </Icon>
    )
  }
}
