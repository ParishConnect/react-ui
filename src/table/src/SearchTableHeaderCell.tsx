import * as React from 'react'
import { noop } from 'lodash'
import { Text } from '../../typography'
import { Icon } from '../../icon'
import TableHeaderCell from './TableHeaderCell'
import { TableCellProps } from './TableCell'

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
  SearchTableHeaderCellProps
> {
  static defaultProps = {
    onChange: noop,
    spellCheck: true,
    placeholder: 'Filter...'
  }

  render() {
    const {
      value,
      onChange = noop,
      autoFocus,
      spellCheck = true,
      placeholder = 'Filter...',
      ...props
    } = this.props

    return (
      <TableHeaderCell {...props}>
        <Icon
          icon="search"
          color="muted"
          marginLeft={2}
          marginRight={10}
          size={12}
        />
        <Text
          is="input"
          size={300}
          flex="1"
          css={invisibleInput}
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
