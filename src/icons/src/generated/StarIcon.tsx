import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class StarIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="star" viewBox="0 0 24 24" {...this.props as any}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </Icon>
    )
  }
}
