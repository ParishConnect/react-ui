import * as React from 'react'
import Pane, { PaneProps } from './Pane'

export default class Card extends React.PureComponent<PaneProps> {
  render() {
    return <Pane borderRadius={5} {...this.props as any} />
  }
}
