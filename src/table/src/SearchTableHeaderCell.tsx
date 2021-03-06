import * as React from 'react'

import { Text } from '../../typography'
import TableHeaderCell from './TableHeaderCell'
import { TableCellProps } from './TableCell'
import { SearchIcon } from '../../icons/index'

const invisibleInput = {
  border: 'none',
  backgroundColor: 'transparent',
  WebkitAppearance: 'none',
  WebkitFontSmoothing: 'antialiased',

  '&:focus': {
    outline: 'none'
  },

  '&::placeholder': {
    color: `rgba(67, 90, 111, 0.7)`
  }
}

export interface SearchTableHeaderCellProps extends TableCellProps {
  /**
   * The value of the input.
   */
  value?: string

  /**
   * Handler to be called when the input changes.
   */
  onChange?: any

  /**
   * Sets whether the component should be automatically focused on component render.
   */
  autoFocus?: boolean

  /**
   * Sets whether to apply spell checking to the content.
   */
  spellCheck?: boolean

  /**
   * Text to display in the input if the input is empty.
   */
  placeholder?: string
}

export default class SearchTableHeaderCell extends React.PureComponent<
  SearchTableHeaderCellProps & any
> {
  static defaultProps = {
    onChange: () => {},
    spellCheck: true,
    placeholder: 'Filter...'
  }

  render() {
    const {
      value,
      onChange = () => {},
      autoFocus,
      spellCheck = true,
      placeholder = 'Filter...',
      ...props
    } = this.props

    return (
      <TableHeaderCell {...(props as any)}>
        <SearchIcon color="muted" marginLeft={2} marginRight={10} size={12} />
        <Text
          is="input"
          size={300}
          flex="1"
          css={invisibleInput as any}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoFocus={autoFocus}
          spellCheck={spellCheck}
          fontWeight={500}
          marginLeft={-2}
          paddingLeft={0}
          placeholder={placeholder}
        />
      </TableHeaderCell>
    )
  }
}
