import * as React from 'react'
import { Textarea } from '../../textarea'
import { TextSize } from '../../typography/src/Text'

export interface EditableCellFieldProps {
  /**
   * Used as the defaultValue of the textarea.
   */
  value: string

  /**
   * The z-index placed on the element.
   */
  zIndex: number

  /**
   * Function to get the target ref of the parent.
   * Used to mirror the position.
   */
  getTargetRef: any

  /**
   * Min width of the textarea.
   * The textarea can never be smaller than the cell.
   */
  minWidth: number

  /**
   * Min height of the textarea.
   * The textarea can never be smaller than the cell.
   */
  minHeight: number

  /**
   * Called when the textarea is blurred, pass the value back to the cell.
   */
  onChangeComplete: any

  /**
   * Called when Escape is hit or componentWillUnmount.
   */
  onCancel: any
  onEscape?: any

  /**
   * Text size of the textarea.
   */
  size?: number
}

interface EditableCellFieldState {
  top: number
  left: number
  height: number
  width: number
}

export default class EditableCellField extends React.PureComponent<
  EditableCellFieldProps,
  EditableCellFieldState
> {
  static defaultProps = {
    minWidth: 80,
    minHeight: 40
  }

  state: EditableCellFieldState = {
    top: 0,
    left: 0,
    height: 0,
    width: 0
  }

  textareaRef: any
  latestAnimationFrame: any
  tableBodyRef: any

  componentDidMount() {
    this.update()

    requestAnimationFrame(() => {
      this.textareaRef.focus()
    })
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.latestAnimationFrame)
    this.props.onCancel()
  }

  getTableBodyRef = (targetRef: any) => {
    if (this.tableBodyRef) return this.tableBodyRef

    let ref = targetRef
    while (ref) {
      const isTableBody = ref.hasAttribute('data-evergreen-table-body')
      if (isTableBody) {
        return ref
      }
      if (ref.parentElement) {
        ref = ref.parentElement
      } else {
        return null
      }
    }

    this.tableBodyRef = ref
    return this.tableBodyRef
  }

  update = () => {
    const { getTargetRef } = this.props
    const targetRef = getTargetRef()
    if (!targetRef) return
    const tableBodyRef = this.getTableBodyRef(targetRef)

    const {
      left,
      top: targetTop,
      height,
      width
    } = targetRef.getBoundingClientRect()

    let top: number
    if (tableBodyRef) {
      const bounds = tableBodyRef.getBoundingClientRect()
      top = Math.min(Math.max(targetTop, bounds.top), bounds.bottom - height)
    } else {
      top = targetTop
    }

    this.setState(
      () => {
        return {
          left,
          top,
          height,
          width
        }
      },
      () => {
        this.latestAnimationFrame = requestAnimationFrame(() => {
          this.update()
        })
      }
    )
  }

  onRef = (ref: any) => {
    this.textareaRef = ref
  }

  handleBlur = () => {
    if (this.textareaRef) this.props.onChangeComplete(this.textareaRef.value)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e
    if (key === 'Escape') {
      this.props.onCancel()
    } else if (key === 'Enter') {
      this.textareaRef.blur()
      e.preventDefault()
    }
  }

  render() {
    const { size, value, minWidth, minHeight, zIndex } = this.props
    const { left, top, height, width } = this.state

    return (
      <Textarea
        innerRef={this.onRef}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        appearance="editable-cell"
        size={size as TextSize}
        style={{
          left,
          top,
          height,
          minHeight: Math.max(height, minHeight),
          width,
          minWidth: Math.max(width, minWidth),
          zIndex
        }}
        height={null as any}
        width={undefined}
        minHeight={null}
        position="fixed"
        defaultValue={value}
      />
    )
  }
}
