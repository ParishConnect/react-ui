import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class TrendingDownIcon extends PureComponent {
  render() {
    return (
      <Icon name="trending-down" viewBox="0 0 24 24" {...this.props}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </Icon>
    )
  }
}
