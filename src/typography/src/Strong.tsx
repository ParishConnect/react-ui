import * as React from 'react'
import Text, { TextProps } from './Text'

export default class Strong extends React.PureComponent<TextProps> {
  render() {
    return <Text is="strong" fontWeight={600} {...(this.props as any)} />
  }
}
