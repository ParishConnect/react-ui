import * as React from 'react'
import cx from 'classnames'
import { Omit } from 'utility-types'
import { noop } from 'lodash'
import { Pane, PaneProps } from '../../layers'
import { ThemeContext } from '../../theme'
import { TableRowProvider } from './TableRowContext'
import manageTableRowFocusInteraction from './manageTableRowFocusInteraction'
import { IntentType } from '../../constants'

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
  /**
   * Class name passed to the table row.
   * Only use if you know what you are doing.
   */
  className?: string
  tabIndex?: number
  style?: object
  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect?(): void
  /**
   * Function that is called on click and enter/space keypress.
   */
  onDeselect?(): void
  onClick?(e: any): void
  onKeyPress?(e: any): void
  innerRef?(ref: any): any
  /**
   * Function that passes errors to custom handlers
   */
  onError(object: { err: any; message: string }): any
}

class TableRow extends React.PureComponent<TableRowProps> {
  public static contextType = ThemeContext
  static defaultProps = {
    intent: 'none',
    appearance: 'default',
    height: 48,
    onClick: noop(),
    onSelect: noop(),
    onDeselect: noop(),
    onKeyPress: noop()
  }

  mainRef: HTMLElement

  handleClick = (e: Event) => {
    this.props.onClick(e)
    if (this.props.isSelectable) {
      if (this.props.isSelected) {
        this.props.onDeselect()
      } else {
        this.props.onSelect()
      }
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (this.props.isSelectable) {
      const { key } = e
      if (key === 'Enter' || key === ' ') {
        this.props.onSelect()
        e.preventDefault()
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        try {
          manageTableRowFocusInteraction(key, this.mainRef)
        } catch (err) {
          this.props.onError({
            err,
            message: 'Error handling keydown Keyboard Event'
          })
        }
      } else if (key === 'Escape' && this.mainRef) {
        this.mainRef.blur()
      }
    }

    this.props.onKeyPress(e)
  }

  onRef = (ref: HTMLElement) => {
    this.mainRef = ref
    if (typeof this.props.innerRef === 'function') {
      this.props.innerRef(ref)
    }
  }

  render() {
    const {
      className,
      height,
      children,
      intent,
      appearance,
      tabIndex = -1,

      isHighlighted,
      isSelectable,
      isSelected,
      ...props
    } = this.props
    const theme = this.context

    const themedClassName = theme.getRowClassName(appearance, intent)

    return (
      <TableRowProvider height={height}>
        <Pane
          innerRef={this.onRef}
          className={cx(themedClassName, className)}
          display="flex"
          aria-selected={isHighlighted}
          aria-current={isSelected}
          data-isselectable={isSelectable}
          tabIndex={isSelectable ? tabIndex : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          height={height}
          borderBottom="muted"
          {...props}
        >
          {children}
        </Pane>
      </TableRowProvider>
    )
  }
}

export default TableRow
