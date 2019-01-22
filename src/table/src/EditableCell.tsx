import * as React from 'react'
import { ThemeContext } from '../../theme'
import { Portal } from '../../portal'
import { Stack } from '../../stack'
import TextTableCell from './TextTableCell'
import { TableCellProps } from './TableCell'
import EditableCellField from './EditableCellField'

export interface EditableCellProps extends TableCellProps {
  /*
   * Makes the TableCell focusable.
   * Will add tabIndex={-1 || this.props.tabIndex}.
   */
  isSelectable?: boolean

  /**
   * When true, the cell can't be edited.
   */
  disabled?: boolean

  /**
   * Optional placeholder when children is falsy.
   */
  placeholder?: React.ReactNode

  /**
   * The size used for the TextTableCell and Textarea.
   */
  size?: 300 | 400

  /**
   * This is the value of the cell.
   */
  children?: string | number

  /**
   * Function called when value changes. (value: string) => void.
   */
  onChange?: any
}

interface EditableCellState {
  value: any
  isEditing?: boolean
}

class EditableCell extends React.PureComponent<
  EditableCellProps,
  EditableCellState
> {
  static contextType = ThemeContext
  static defaultProps = {
    size: 300,
    isSelectable: true
  }

  state: EditableCellState = {
    value: this.props.children
  }

  mainRef: any
  overlayRef: any

  static getDerivedStateFromProps(
    props: EditableCellProps,
    state: EditableCellState
  ) {
    if (props.children !== state.value) {
      return {
        value: props.children
      }
    }
    return null
  }

  onMainRef = (ref: any) => {
    this.mainRef = ref
  }

  onOverlayRef = (ref: any) => {
    this.overlayRef = ref
  }

  handleDoubleClick = () => {
    if (this.props.disabled || !this.props.isSelectable) return

    this.setState({
      isEditing: true
    })
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (this.props.disabled) return
    const { key } = e

    /**
     * When the user presses a character on the keyboard, use that character
     * as the value in the text field.
     */
    if (key.match(/^[a-z]{0,10}$/) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      this.setState({
        isEditing: true,
        value: key
      })
    } else if (key === 'Enter') {
      this.setState({
        isEditing: true
      })
    }
  }

  handleFieldChangeComplete = (value: any) => {
    const { onChange, isSelectable } = this.props
    const currentValue = this.state.value

    this.setState({
      isEditing: false,
      value
    })

    if (currentValue !== value && typeof onChange === 'function') {
      onChange(value)
    }

    if (this.mainRef && isSelectable) {
      this.mainRef.focus()
    }
  }

  handleFieldCancel = () => {
    this.setState({ isEditing: false })
  }

  handleClick = () => {
    this.mainRef.focus()
  }

  render() {
    const {
      children,
      size,
      disabled,
      placeholder,
      isSelectable,
      textProps = {},
      ...props
    } = this.props
    const { isEditing, value } = this.state

    return (
      <React.Fragment>
        <TextTableCell
          innerRef={this.onMainRef}
          isSelectable={isSelectable && !disabled}
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          onKeyDown={this.handleKeyDown}
          cursor={disabled ? 'not-allowed' : isSelectable ? 'default' : 'text'}
          textProps={{
            size,
            opacity: disabled || (!children && placeholder) ? 0.5 : 1,
            ...textProps
          }}
          {...props}
        >
          {children ? children : placeholder}
        </TextTableCell>
        {isEditing && (
          <Portal>
            <Stack>
              {(zIndex: number) => (
                <EditableCellField
                  zIndex={zIndex}
                  getTargetRef={() => this.mainRef}
                  value={value}
                  onChangeComplete={this.handleFieldChangeComplete}
                  onCancel={this.handleFieldCancel}
                  size={size}
                />
              )}
            </Stack>
          </Portal>
        )}
      </React.Fragment>
    )
  }
}

export default EditableCell
