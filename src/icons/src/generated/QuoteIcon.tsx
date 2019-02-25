import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class QuoteIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="quote" viewBox="0 0 24 24" {...this.props}>
        <circle cx="6.886" cy="8.591" r="4.091" />
        <path d="M10.977,8.591c0.001,11.049 -9.545,10.909 -9.545,10.909" />
        <circle cx="18.477" cy="8.591" r="4.091" />
        <path d="M22.568,8.591c0.001,11.049 -9.545,10.909 -9.545,10.909" />
      </Icon>
    )
  }
}
