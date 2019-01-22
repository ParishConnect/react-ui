import * as React from 'react'
import { debounce } from 'lodash'
import { Positioner } from '../../positioner'
import { Position, PositionEnum, PositionType } from '../../constants'
import TooltipStateless, { TooltipStatelessProps } from './TooltipStateless'
import { PopoverProps } from '../../popover/src/Popover'

let idCounter = 0

export interface TooltipProps {
  /**
   * The appearance of the tooltip.
   */
  appearance: 'default' | 'card'

  /**
   * The position the Popover is on.
   */
  position?: PositionEnum | PositionType

  /**
   * The content of the Popover.
   */
  content: React.ReactNode

  /**
   * Time in ms before hiding the Tooltip.
   */
  hideDelay: number

  /**
   * When True, manually show the Tooltip.
   */
  isShown?: boolean

  /**
   * Properties passed through to the Tooltip.
   */
  statelessProps?: TooltipStatelessProps
  /**
   * Tooltips can be used within a Popover (not the other way around)
   * When a Tooltip is used within a Popover, the Popover passes
   * its props to the Tooltip in a `popoverProps` object.
   */
  popoverProps?: PopoverProps
}

interface TooltipState {
  id: string
  isShown?: boolean
  isShownByTarget?: boolean
}

export default class Tooltip extends React.PureComponent<
  TooltipProps,
  TooltipState
> {
  static defaultProps = {
    appearance: 'default',
    position: Position.BOTTOM,
    hideDelay: 120
  }

  constructor(props: TooltipProps) {
    super(props)

    this.state = {
      id: `evergreen-tooltip-${++idCounter}`,
      isShown: props.isShown,
      isShownByTarget: false
    }

    this.handleMouseLeaveTarget = debounce(
      this.handleMouseLeaveTarget,
      this.props.hideDelay
    )

    this.hide = debounce(this.hide, this.props.hideDelay)
  }

  show = () => {
    if (this.state.isShown) return
    this.setState({
      isShown: true
    })
  }

  hide = () => {
    if (!this.state.isShown) return
    this.setState({
      isShown: false
    })
  }

  renderTarget = ({ getRef }) => {
    const { children } = this.props

    const tooltipTargetProps = {
      onMouseEnter: this.show,
      onMouseLeave: this.hide,
      'aria-describedby': this.state.id
    }

    /**
     * Tooltips can be used within a Popover (not the other way around)
     * When a Tooltip is used within a Popover, the Popover passes
     * its props to the Tooltip in a `popoverProps` object.
     */
    if (this.props.popoverProps) {
      const {
        getTargetRef,
        // tslint:disable-next-line:no-unused
        isShown,
        ...popoverTargetProps
      } = this.props.popoverProps

      return React.cloneElement(children as React.ReactElement<any>, {
        // Add the Popover props to the target.
        ...popoverTargetProps,
        // Add the Tooltip props to the target.
        ...tooltipTargetProps,

        innerRef: (ref: any) => {
          // Get the ref for the Tooltip.
          getRef(ref)
          // Pass the ref to the Popover.
          getTargetRef(ref)
        }
      })
    }

    /**
     * With normal usage only the props for a Tooltip are passed to the target.
     */
    return React.cloneElement(children as React.ReactElement<any>, {
      ...tooltipTargetProps,
      innerRef: (ref: any) => {
        getRef(ref)
      }
    })
  }

  isPopoverShown = () =>
    this.props.popoverProps && this.props.popoverProps.isShown

  handleMouseEnterTarget = () => {
    this.setState({
      isShownByTarget: true
    })
  }

  handleMouseLeaveTarget = () => {
    this.setState({
      isShownByTarget: false
    })
  }

  render() {
    const {
      appearance,
      isShown,
      content,
      position,
      statelessProps
    } = this.props
    const { isShown: stateIsShown, isShownByTarget } = this.state

    let shown =
      (isShown || stateIsShown || isShownByTarget) && !this.isPopoverShown()

    // Tooltip was explicitly set to not be shown
    if (isShown === false) {
      shown = false
    }

    return (
      <Positioner
        target={({ getRef }: any) => {
          return this.renderTarget({ getRef })
        }}
        isShown={shown as boolean}
        position={position}
        animationDuration={160}
      >
        {({ css, style, state, getRef }) => (
          <TooltipStateless
            id={this.state.id}
            appearance={appearance}
            innerRef={ref => getRef(ref)}
            data-state={state}
            css={css}
            style={style}
            onMouseEnter={this.handleMouseEnterTarget}
            onMouseLeave={this.handleMouseLeaveTarget}
            {...statelessProps}
          >
            {content}
          </TooltipStateless>
        )}
      </Positioner>
    )
  }
}
