import * as React from 'react'
import { Omit } from 'utility-types'
import { Pane, PaneProps } from '../../layers'
import { ThemeContext } from '../../theme'
import { toaster } from '../../toaster'
import manageTableCellFocusInteraction from './manageTableCellFocusInteraction'
import { TableRowConsumer } from './TableRowContext'

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
}

class TableCell extends React.PureComponent<TableCellProps> {
  static contextType = ThemeContext
  static defaultProps = {
    appearance: 'default',
    onSelect: () => {},
    onDeselect: () => {}
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
      this.props.onKeyDown(e as any)
    }
  }

  onRef = (ref: HTMLElement) => {
    this.mainRef = ref

    if (typeof this.props.innerRef === 'function') {
      this.props.innerRef(ref as any)
    }
  }

  handleClick = (e: MouseEvent) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e as any)
    }
  }

  render() {
    const {
      children,
      appearance,
      isSelectable,
      tabIndex = -1,
      rightView,
      css,
      ...props
    } = this.props
    const theme = this.context

    const themedCSS = theme.getTableCellCSS(appearance)

    return (
      <TableRowConsumer>
        {(height: any) => (
          <Pane
            innerRef={this.onRef}
            height={height}
            tabIndex={isSelectable ? tabIndex : undefined}
            data-isselectable={isSelectable}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            css={{ ...themedCSS, ...css }}
            {...TableCell.styles}
            {...props}
          >
            {children}
            {rightView ? rightView : null}
          </Pane>
        )}
      </TableRowConsumer>
    )
  }
}

export default TableCell
