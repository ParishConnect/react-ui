import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class TrendingUpIcon extends PureComponent {
  render() {
    return (
      <Icon name="trending-up" viewBox="0 0 24 24" {...this.props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </Icon>
    )
  }
}
