import * as React from 'react'
import { Pane, PaneProps } from '../../layers'

export default class TableBody extends React.PureComponent<PaneProps> {
  render() {
    const { children, ...props } = this.props
    return (
      <Pane data-evergreen-table-body flex="1" overflowY="scroll" {...props}>
        {children}
      </Pane>
    )
  }
}
