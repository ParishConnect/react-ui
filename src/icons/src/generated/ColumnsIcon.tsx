import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ColumnsIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="columns" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
      </Icon>
    )
  }
}
