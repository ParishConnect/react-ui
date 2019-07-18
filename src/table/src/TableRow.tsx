import * as React from 'react'
import { Omit } from 'utility-types'
import { IntentType } from '../../constants/index'
import { Pane, PaneProps } from '../../layers'
import safeInvoke from '../../lib/safe-invoke'
import warning from '../../lib/warning'
import { ThemeContext } from '../../theme'
import manageTableRowFocusInteraction from './manageTableRowFocusInteraction'
import { TableRowProvider } from './TableRowContext'

export interface TableRowProps extends Omit<PaneProps, 'appearance'> {
  /**
   * The height of the row. Remember to add paddings when using "auto".
   */
  height?: number | string
  /**
   * Makes the TableRow selectable.
   */
  isSelectable?: boolean
  /**
   * Makes the TableRow selected.
   */
  isSelected?: boolean
  /**
   * Manually set the TableRow to be highlighted.
   */
  isHighlighted?: boolean
  /**
   * The intent of the alert.
   */
  intent?: IntentType
  /**
   * The appearance of the table row. Default theme only support default.
   */
  appearance?: string
  tabIndex?: number
  style?: React.CSSProperties
  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect?: any
  /**
   * Function that is called on click and enter/space keypress.
   */
  onDeselect?: any
  onClick?: any
  onKeyPress?: any
  innerRef?: any
  /**
   * Function that passes errors to custom handlers
   */
  onError?: any
}

class TableRow extends React.PureComponent<TableRowProps> {
  mainRef: any
  static contextType = ThemeContext
  static defaultProps = {
    intent: 'none',
    appearance: 'default',
    height: 48,
    onSelect: () => {},
    onDeselect: () => {},
    onKeyPress: () => {}
  }

  handleClick = e => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e)
    }

    if (this.props.isSelectable) {
      if (this.props.isSelected) {
        this.props.onDeselect()
      } else {
        this.props.onSelect()
      }
    }
  }

  handleKeyDown = e => {
    if (this.props.isSelectable) {
      const { key } = e
      if (key === 'Enter' || key === ' ') {
        this.props.onSelect()
        e.preventDefault()
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        try {
          manageTableRowFocusInteraction(key, this.mainRef)
        } catch (error) {}
      } else if (key === 'Escape') {
        if (this.mainRef) this.mainRef.blur()
      }
    }

    this.props.onKeyPress(e)
  }

  onRef = ref => {
    this.mainRef = ref
    safeInvoke(this.props.innerRef, ref)
  }

  render() {
    const {
      innerRef,
      height,
      children,
      intent,
      appearance,
      tabIndex = -1,

      css,

      // Filter out
      onClick,
      onKeyPress,
      onSelect,
      onDeselect,

      isHighlighted,
      isSelectable,
      isSelected,
      ...props
    } = this.props
    const theme = this.context

    if (process.env.NODE_ENV !== 'production') {
      warning(
        typeof onClick === 'function',
        '<Table.Row> expects `onSelect` prop, but you passed `onClick`.'
      )
    }

    const themedCSS = theme.getRowCSS(appearance, intent)

    return (
      <TableRowProvider height={height}>
        <Pane
          innerRef={this.onRef}
          display="flex"
          aria-selected={isHighlighted}
          aria-current={isSelected}
          data-isselectable={isSelectable}
          tabIndex={isSelectable ? tabIndex : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          height={height}
          borderBottom="muted"
          css={{ ...themedCSS, ...css }}
          {...props}
        >
          {children}
        </Pane>
      </TableRowProvider>
    )
  }
}

export default TableRow
