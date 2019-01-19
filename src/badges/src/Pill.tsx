import * as React from 'react'
import Badge from './Badge'
import { TextProps } from '../../typography/src/Text'

export default class Pill extends React.PureComponent<TextProps> {
  render() {
    return <Badge borderRadius={999} {...this.props} />
  }
}
