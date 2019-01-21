import * as React from 'react'
import TableCell, { TableCellProps } from './TableCell'

export default class TableHeaderCell extends React.PureComponent<
  TableCellProps
> {
  render() {
    return <TableCell overflow="visible" borderBottom={null} {...this.props} />
  }
}
