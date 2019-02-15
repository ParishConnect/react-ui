import * as React from 'react'
import { Pane } from '../../layers'
import { TableRow, TextTableCell } from '../../table'
import { TableRowProps } from '../../table/src/TableRow'
import { CheckIcon } from '../../icons/index'

export interface OptionProps extends TableRowProps {
  label?: string | React.ReactNode
  style?: React.CSSProperties
  height?: number
  isHighlighted?: boolean
  isSelected?: boolean
  isSelectable?: boolean
  disabled?: boolean
  onSelect(): void
  onDeselect(): void
}

export default class Option extends React.PureComponent<OptionProps> {
  render() {
    const {
      label,
      onSelect,
      onDeselect,
      isHighlighted,
      isSelected,
      isSelectable,
      disabled,
      style,
      height,
      ...props
    } = this.props

    const textProps = { color: '' }
    if (disabled) {
      textProps.color = 'muted'
    }
    if (isSelected) {
      textProps.color = 'selected'
    }

    return (
      <TableRow
        isSelectable={isSelectable && !disabled}
        isHighlighted={isHighlighted}
        onSelect={onSelect}
        onDeselect={onDeselect}
        isSelected={isSelected}
        style={style}
        display="flex"
        alignItems="center"
        borderBottom={false}
        {...props}
      >
        <Pane
          paddingLeft={12}
          paddingRight={8}
          opacity={isSelected ? 1 : 0}
          flexGrow={0}
          paddingTop={4}
        >
          <CheckIcon color="selected" size={14} />
        </Pane>
        <TextTableCell
          height={height}
          borderBottom="muted"
          textProps={textProps}
          paddingLeft={0}
          borderRight={null}
          flex={1}
          alignSelf="stretch"
          cursor={disabled ? 'default' : 'pointer'}
        >
          {label}
        </TextTableCell>
      </TableRow>
    )
  }
}
