import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PieChartIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="pie-chart" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </Icon>
    )
  }
}
