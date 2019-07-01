import * as React from 'react'
import { Text } from '../../typography'
import TableCell, { TableCellProps } from './TableCell'

const ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

export interface TextTableCellProps extends TableCellProps {
  /**
   * Adds textAlign: right and fontFamily: mono.
   */
  isNumber?: boolean
  /**
   * Pass additional props to the Text component.
   */
  textProps?: object
}

export default class TextTableCell extends React.PureComponent<
  TextTableCellProps
> {
  static defaultProps = {
    isNumber: false
  }

  render() {
    const { children, textProps, isNumber, ...props } = this.props

    return (
      <TableCell {...(props as any)}>
        <Text
          size={300}
          flex="1"
          {...ellipsis}
          {...(isNumber ? { fontFamily: 'mono' } : {})}
          {...(textProps as any)}
        >
          {children}
        </Text>
      </TableCell>
    )
  }
}
