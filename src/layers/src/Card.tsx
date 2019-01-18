import React, { PureComponent } from 'react'
import Pane, { PaneProps } from './Pane'

export default class Card extends PureComponent<PaneProps> {
  render() {
    return <Pane borderRadius={5} {...this.props} />
  }
}
