import * as React from 'react'
import { Text } from '../../typography'
import TableHeaderCell from './TableHeaderCell'
import { TableCellProps } from './TableCell'
import { TextProps } from '../../typography/src/Text'

export interface TextTableHeaderCellProps extends TableCellProps {
  textProps?: TextProps
}

export default class TextTableHeaderCell extends React.PureComponent<
  TextTableHeaderCellProps
> {
  render() {
    const { children, textProps, ...props } = this.props
    return (
      <TableHeaderCell {...(props as any)}>
        <Text fontWeight={500} size={300} flex="1" {...textProps}>
          {children}{' '}
        </Text>
      </TableHeaderCell>
    )
  }
}
