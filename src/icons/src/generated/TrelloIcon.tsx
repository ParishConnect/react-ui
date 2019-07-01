import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TrelloIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="trello" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <rect x="7" y="7" width="3" height="9" />
        <rect x="14" y="7" width="3" height="5" />
      </Icon>
    )
  }
}
