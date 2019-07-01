import * as React from 'react'
import { noop } from 'lodash'
import { Positioner } from '../../positioner'
import { Tooltip } from '../../tooltip'
import { Position, PositionEnum, PositionType } from '../../constants'
import { PaneProps } from '../../layers'
import PopoverStateless from './PopoverStateless'
import { Overwrite } from 'utility-types'

export interface PopoverProps {
  /**
   * The position the Popover is on. Smart positioning might override this.
   */
  position?: PositionEnum | PositionType | string
  /**
   * When true, the Popover is manually shown.
   */
  isShown?: boolean
  /**
   * The content of the Popover.
   */
  content: React.ReactNode | any
  /**
   * The display property passed to the Popover card.
   */
  display?: string
  /**
   * The min width of the Popover card.
   */
  minWidth?: string | number
  /**
   * The min height of the Popover card.
   */
  minHeight?: string | number
  /**
   * Properties passed through to the Popover card.
   */
  statelessProps?: PaneProps
  /**
   * Duration of the animation.
   */
  animationDuration?: any
  /**
   * When true, bring focus inside of the Popover on open.
   */
  bringFocusInside?: boolean
  /**
   * When true, bring focus to target on Popover close
   * @default true
   */
  focusTargetOnClose?: boolean
  /**
   * Whether to close after clicking. Useful for menus
   */
  closeOnClick?: boolean
  /**
   * Function called when the Popover opens.
   */
  onOpen?(): () => {}
  /**
   * Function fired when Popover closes.
   */
  onClose?(): () => {}
  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?(): () => {}
  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?(): () => {}
}

interface PopoverState {
  isShown?: boolean
}

export default class Popover extends React.Component<
  Overwrite<PopoverProps, PaneProps>,
  PopoverState
> {
  static defaultProps = {
    position: Position.BOTTOM,
    isShown: false,
    minWidth: 200,
    minHeight: 40,
    animationDuration: 300,
    onOpen: () => {},
    onClose: () => {},
    onOpenComplete: () => {},
    onCloseComplete: () => {},
    bringFocusInside: false,
    closeOnClick: false,
    focusTargetOnClose: true
  }

  popoverNode: HTMLElement | any
  targetRef: HTMLElement | any

  state: PopoverState = {
    isShown: this.props.isShown
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onBodyClick, false)
    document.body.removeEventListener('keydown', this.onEsc, false)
  }

  /**
   * Methods borrowed from BlueprintJS
   * https://github.com/palantir/blueprint/blob/release/2.0.0/packages/core/src/components/overlay/overlay.tsx
   */
  bringFocusInside = () => {
    // Always delay focus manipulation to just before repaint to prevent scroll jumping
    return requestAnimationFrame(() => {
      // Container ref may be undefined between component mounting and Portal rendering
      // NOTE: activeElement may be undefined in some rare cases in IE
      if (
        this.popoverNode == null || // tslint:disable-line:triple-equals
        document.activeElement == null || // tslint:disable-line:triple-equals
        !this.state.isShown
      ) {
        return
      }

      const isFocusOutsideModal = !this.popoverNode.contains(
        document.activeElement
      )
      if (isFocusOutsideModal) {
        // Element marked autofocus has higher priority than the other clowns
        const autofocusElement: HTMLElement = this.popoverNode.querySelector(
          '[autofocus]'
        )
        const wrapperElement: HTMLElement = this.popoverNode.querySelector(
          '[tabindex]'
        )
        const buttonElements: any = this.popoverNode.querySelectorAll(
          'button, a, [role="menuitem"], [role="menuitemradio"]'
        )

        if (autofocusElement) {
          autofocusElement.focus()
        } else if (wrapperElement) {
          wrapperElement.focus()
        } else if (buttonElements.length > 0) {
          buttonElements[0].focus()
        }
      }
    })
  }

  bringFocusBackToTarget = () => {
    return requestAnimationFrame(() => {
      if (
        this.popoverNode == null || // tslint:disable-line:triple-equals
        document.activeElement == null // tslint:disable-line:triple-equals
      ) {
        return
      }

      const isFocusInsideModal = this.popoverNode.contains(
        document.activeElement
      )

      // Bring back focus on the target.
      if (
        this.props.focusTargetOnClose &&
        this.targetRef &&
        (document.activeElement === document.body || isFocusInsideModal)
      ) {
        this.targetRef.focus()
      }
    })
  }

  onBodyClick = (e: PointerEvent) => {
    // Ignore clicks on the popover or button
    if (this.targetRef && this.targetRef.contains(e.target)) {
      return
    }

    if (this.popoverNode && this.popoverNode.contains(e.target)) {
      return
    }

    this.close()
  }

  onEsc = (e: KeyboardEvent) => {
    // Esc key
    if (e.keyCode === 27) {
      this.close()
    }
  }

  toggle = () => {
    if (this.state.isShown) {
      this.close()
    } else {
      this.open()
    }
  }

  open = () => {
    if (this.state.isShown) {
      return
    }

    this.setState({ isShown: true })
    document.body.addEventListener('click', this.onBodyClick, false)
    document.body.addEventListener('keydown', this.onEsc, false)

    const { onOpen = noop } = this.props
    onOpen()
  }

  close = () => {
    if (!this.state.isShown) {
      return
    }

    this.setState({ isShown: false })
    document.body.removeEventListener('click', this.onBodyClick, false)
    document.body.removeEventListener('keydown', this.onEsc, false)

    this.bringFocusBackToTarget()

    const { onClose } = this.props
    onClose!()
  }

  handleOpenComplete = () => {
    if (this.props.bringFocusInside) this.bringFocusInside()
    const { onOpenComplete = noop } = this.props
    onOpenComplete()
  }

  handleCloseComplete = () => {
    const { onCloseComplete = noop } = this.props
    onCloseComplete()
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      this.bringFocusInside()
    }
  }

  renderTarget = ({ getRef, isShown }: any) => {
    const { children } = this.props
    const x = children as any
    const isTooltipInside = x && x.type === Tooltip

    const getTargetRef = (ref: HTMLElement) => {
      this.targetRef = ref
      getRef(ref)
    }

    /**
     * When a function is passed, you can control the Popover manually.
     */
    if (typeof children === 'function') {
      return children({
        toggle: this.toggle,
        getRef: getTargetRef,
        isShown
      })
    }

    const popoverTargetProps = {
      onClick: this.toggle,
      onKeyDown: this.handleKeyDown,
      role: 'button',
      'aria-expanded': isShown,
      'aria-haspopup': true
    }

    /**
     * Tooltips can be used within a Popover (not the other way around)
     * In this case the children is the Tooltip instead of a button.
     * Pass the properties to the Tooltip and let the Tooltip
     * add the properties to the target.
     */
    if (isTooltipInside) {
      return React.cloneElement(children as React.ReactElement<any>, {
        popoverProps: {
          getTargetRef,
          isShown,

          /**
           * These propeties will be spread as `popoverTargetProps`
           * in the Tooltip component.
           */

          ...popoverTargetProps
        }
      })
    }

    /**
     * With normal usage only popover props end up on the target.
     */
    return React.cloneElement(children as React.ReactElement<any>, {
      innerRef: getTargetRef,
      ...popoverTargetProps
    })
  }

  render() {
    const {
      isShown,
      content,
      display,
      minWidth,
      position,
      minHeight,
      statelessProps,
      animationDuration,
      onCloseComplete
    } = this.props
    const { isShown: stateIsShown } = this.state

    const shown: any = isShown || stateIsShown

    return (
      <Positioner
        // tslint:disable-next-line:no-shadowed-variable
        target={({ getRef, isShown, targetWidth }) => {
          return this.renderTarget({ getRef, isShown, targetWidth })
        }}
        isShown={shown}
        position={position as PositionType}
        animationDuration={animationDuration}
        onOpenComplete={this.handleOpenComplete}
        onCloseComplete={onCloseComplete}
      >
        {({ css, style, state, getRef }: any) => (
          <PopoverStateless
            innerRef={ref => {
              this.popoverNode = ref
              getRef(ref)
            }}
            data-state={state}
            css={css}
            style={style}
            display={display}
            minWidth={minWidth}
            minHeight={minHeight}
            {...(statelessProps as any)}
          >
            {typeof content === 'function'
              ? content({ close: this.close })
              : content}
          </PopoverStateless>
        )}
      </Positioner>
    )
  }
}
