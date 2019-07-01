import * as React from 'react'
import Option, { OptionProps } from '../../select-menu/src/Option'

export interface AutocompleteItemProps extends OptionProps {
  style?: React.CSSProperties
  isSelected?: boolean
  isHighlighted?: boolean
}

export default class AutocompleteItem extends React.PureComponent<
  AutocompleteItemProps
> {
  render() {
    const {
      isHighlighted,
      createable,
      isSelected,
      style,
      children,
      ...props
    } = this.props

    return (
      <Option
        createable={createable}
        isHighlighted={isHighlighted}
        isSelected={isSelected}
        label={children}
        style={style}
        {...props as any}
      />
    )
  }
}
