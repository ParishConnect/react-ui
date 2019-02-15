import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CropIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="crop" viewBox="0 0 24 24" {...this.props}>
        <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15" />
        <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15" />
      </Icon>
    )
  }
}
