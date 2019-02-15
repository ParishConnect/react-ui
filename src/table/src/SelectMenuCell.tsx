import * as React from 'react'
import { debounce } from 'lodash'
import { ThemeContext } from '../../theme'
import { SelectMenu } from '../../select-menu'
import TextTableCell from './TextTableCell'
import { TableCellProps } from './TableCell'
import { ChevronDownIcon } from '../../icons/index'

const MIN_SELECT_MENU_WIDTH = 240

export interface SelectMenuCellProps extends TableCellProps {
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
  size?: 300 | 400 | number

  selectMenuProps?: object
}

interface SelectMenuCellState {
  targetWidth: number
  shouldClickToggle: boolean
  isFocused: boolean
}

class SelectMenuCell extends React.PureComponent<
  SelectMenuCellProps,
  SelectMenuCellState
> {
  static contextType = ThemeContext
  static defaultProps = {
    size: 300,
    isSelectable: true
  }

  state: SelectMenuCellState = {
    targetWidth: MIN_SELECT_MENU_WIDTH,
    shouldClickToggle: false,
    isFocused: false
  }

  mainRef: any
  overlayRef: any

  constructor(props: SelectMenuCellProps) {
    super(props)
    this.onResize = debounce(this.onResize, 200)
  }

  componentDidMount() {
    // Call this to initialize and set
    this.updateOnResize()
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.updateOnResize()
  }

  updateOnResize = () => {
    if (!this.mainRef) return
    const targetWidth = this.mainRef.offsetWidth
    this.setState({
      targetWidth: Math.max(MIN_SELECT_MENU_WIDTH, targetWidth)
    })
  }

  onMainRef = (getRef: any, ref: any) => {
    this.mainRef = ref
    getRef(ref)
  }

  onOverlayRef = (ref: any) => {
    this.overlayRef = ref
  }

  handleKeyDown = (toggle: () => void, isShown: boolean, e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      if (!isShown && this.props.isSelectable && !this.props.disabled) {
        toggle()
      }
    }
  }

  handleDoubleClick = (toggle: () => void, isShown: boolean) => {
    if (!isShown && this.props.isSelectable && !this.props.disabled) {
      toggle()
    }
  }

  handleClick = (toggle: () => void, isShown: boolean) => {
    const { shouldClickToggle } = this.state

    if (!shouldClickToggle && !isShown) {
      this.setState({
        shouldClickToggle: true
      })
      return
    }

    if (this.props.isSelectable && !this.props.disabled) {
      toggle()
      this.setState({
        shouldClickToggle: true
      })
    }
  }

  handleFocus = () => {
    this.setState({
      isFocused: true
    })
  }

  handleBlur = () => {
    this.setState({
      shouldClickToggle: false,
      isFocused: false
    })
  }

  render() {
    const {
      children,
      size,
      selectMenuProps,
      disabled,
      placeholder,
      isSelectable,
      textProps = {},
      ...props
    } = this.props
    const { targetWidth, isFocused } = this.state

    let cursor = 'default'
    if (disabled) {
      cursor = 'not-allowed'
    } else if (isSelectable) {
      if (isFocused) {
        cursor = 'pointer'
      } else {
        cursor = 'default'
      }
    } else {
      cursor = 'text'
    }

    return (
      <SelectMenu width={targetWidth} {...selectMenuProps}>
        {({ toggle, getRef, isShown }: any) => {
          return (
            <TextTableCell
              innerRef={this.onMainRef.bind(null, getRef)}
              onClick={this.handleClick.bind(null, toggle, isShown)}
              onFocus={this.handleFocus.bind(null, toggle, isShown)}
              onBlur={this.handleBlur}
              isSelectable={isSelectable && !disabled}
              rightView={
                isSelectable ? <ChevronDownIcon color="muted" /> : undefined
              }
              aria-haspopup
              aria-expanded={isShown}
              cursor={isShown ? 'pointer' : cursor}
              textProps={{
                size,
                opacity: disabled || (!children && placeholder) ? 0.5 : 1,
                ...textProps
              }}
              onKeyDown={this.handleKeyDown.bind(null, toggle, isShown)}
              onDoubleClick={this.handleDoubleClick.bind(null, toggle, isShown)}
              {...props}
            >
              {children ? children : placeholder}
            </TextTableCell>
          )
        }}
      </SelectMenu>
    )
  }
}

export default SelectMenuCell
