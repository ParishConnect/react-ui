import * as React from 'react'
import Text, { TextProps } from './Text'

export default class Label extends React.PureComponent<TextProps> {
  render() {
    return <Text is="label" fontWeight={500} {...this.props as any} />
  }
}
