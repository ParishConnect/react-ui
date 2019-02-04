import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class BarChart2Icon extends PureComponent {
  render() {
    return (
      <Icon name="bar-chart-2" viewBox="0 0 24 24" {...this.props}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </Icon>
    )
  }
}
