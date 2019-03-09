import React, { PureComponent } from 'react'
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
  hasIcon?: boolean
  onSelect: any
  onDeselect: any
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
      hasIcon = true,
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
        {hasIcon && (
          <Pane
            paddingLeft={12}
            paddingRight={8}
            opacity={isSelected ? 1 : 0}
            flexGrow={0}
            paddingTop={4}
          >
            <CheckIcon size={14} color="selected" />
          </Pane>
        )}
        <TextTableCell
          height={height}
          // borderBottom="muted"
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
