import * as React from 'react'
import { cx } from 'emotion'
import { toaster } from '../../toaster'
import { Omit } from 'utility-types'
import { ThemeContext } from '../../theme'
import { Pane, PaneProps } from '../../layers'
import { TableRowConsumer } from './TableRowContext'
import manageTableCellFocusInteraction from './manageTableCellFocusInteraction'
import { noop } from 'lodash'

export interface TableCellProps extends Omit<PaneProps, 'appearance'> {
  /*
   * Makes the TableCell focusable. Used by EditableCell.
   * Will add tabIndex={-1 || this.props.tabIndex}.
   */
  isSelectable?: boolean

  /**
   * The appearance of the table row. Default theme only support default.
   */
  appearance?: string

  /**
   * Optional node to be placed on the right side of the table cell.
   * Useful for icons and icon buttons.
   */
  rightView?: React.ReactNode

  /**
   * Class name passed to the table cell.
   * Only use if you know what you are doing.
   */
  className?: string
}

class TableCell extends React.PureComponent<TableCellProps> {
  static contextType = ThemeContext
  static defaultProps = {
    appearance: 'default',
    onSelect: noop,
    onDeselect: noop
  }

  static styles = {
    paddingX: 12,
    boxSizing: 'border-box',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden'
  }

  mainRef: HTMLElement

  handleKeyDown = (e: KeyboardEvent) => {
    if (this.props.isSelectable) {
      const { key } = e
      if (
        key === 'ArrowUp' ||
        key === 'ArrowDown' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight'
      ) {
        try {
          manageTableCellFocusInteraction(key, this.mainRef)
        } catch (err) {
          toaster.danger('Keyboard interaction not possible')
          console.error('Keyboard control not impossible', err)
        }
      } else if (key === 'Escape') {
        this.mainRef.blur()
      }
    }

    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(e)
    }
  }

  onRef = (ref: HTMLElement) => {
    this.mainRef = ref

    if (typeof this.props.innerRef === 'function') {
      this.props.innerRef(ref)
    }
  }

  handleClick = (e: MouseEvent) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e)
    }
  }

  render() {
    const {
      children,
      appearance,
      isSelectable,
      tabIndex = -1,
      className,
      rightView,
      ...props
    } = this.props
    const theme = this.context

    const themedClassName = theme.getTableCellClassName(appearance)

    return (
      <TableRowConsumer>
        {(height: any) => {
          return (
            <Pane
              innerRef={this.onRef}
              height={height}
              className={cx(themedClassName, className)}
              tabIndex={isSelectable ? tabIndex : undefined}
              data-isselectable={isSelectable}
              onClick={this.handleClick}
              onKeyDown={this.handleKeyDown}
              {...TableCell.styles}
              {...props}
            >
              {children}
              {rightView ? rightView : null}
            </Pane>
          )
        }}
      </TableRowConsumer>
    )
  }
}

export default TableCell
