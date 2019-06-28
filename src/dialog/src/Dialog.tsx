import * as React from 'react'
import { keyframes } from '@emotion/core'
import { Pane } from '../../layers'
import { Paragraph, Heading } from '../../typography'
import { Overlay } from '../../overlay'
import { Button, IconButton } from '../../buttons'
import { ThemeContext } from '../../theme'
import { IntentType } from '../../constants/index'
import { XIcon } from '../../icons/index'

const animationEasing = {
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)'
}

const ANIMATION_DURATION = 200

const openAnimation = keyframes({
  from: {
    transform: 'scale(0.8)',
    opacity: 0
  },
  to: {
    transform: 'scale(1)',
    opacity: 1
  }
})

const closeAnimation = keyframes({
  from: {
    transform: 'scale(1)',
    opacity: 1
  },
  to: {
    transform: 'scale(0.8)',
    opacity: 0
  }
})

const animationStyles = {
  '&[data-state="entering"], &[data-state="entered"]': {
    animation: `${openAnimation} ${ANIMATION_DURATION}ms ${
      animationEasing.deceleration
    } both`
  },
  '&[data-state="exiting"]': {
    animation: `${closeAnimation} ${ANIMATION_DURATION}ms ${
      animationEasing.acceleration
    } both`
  }
}

export interface DialogProps {
  /**
   * The intent of the Dialog. Used for the button.
   */
  intent: IntentType

  /**
   * When true, the dialog is shown.
   */
  isShown?: boolean

  /**
   * Title of the Dialog. Titles should use Title Case.
   */
  title?: React.ReactNode

  /**
   * When true, the header with the title and close icon button is shown.
   */
  hasHeader?: boolean

  /**
   * When true, the footer with the cancel and confirm button is shown.
   */
  hasFooter?: boolean

  /**
   * When true, the cancel button is shown.
   */
  hasCancel?: boolean

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?: any

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?: any

  /**
   * Function that will be called when the confirm button is clicked.
   * This does not close the Dialog. A close function will be passed
   * as a paramater you can use to close the dialog.
   *
   * `onConfirm={(close) => close()}`
   */
  onConfirm?: any

  /**
   * Label of the confirm button.
   */
  confirmLabel?: string

  /**
   * When true, the confirm button is set to loading.
   */
  isConfirmLoading?: boolean

  /**
   * When true, the confirm button is set to disabled.
   */
  isConfirmDisabled?: boolean

  /**
   * Function that will be called when the cancel button is clicked.
   * This closes the Dialog by default.
   *
   * `onCancel={(close) => close()}`
   */
  onCancel?: any

  /**
   * Label of the cancel button.
   */
  cancelLabel?: string

  /**
   * Boolean indicating if clicking the overlay should close the overlay.
   */
  shouldCloseOnOverlayClick?: boolean

  /**
   * Boolean indicating if pressing the esc key should close the overlay.
   */
  shouldCloseOnEscapePress?: boolean

  /**
   * Width of the Dialog.
   */
  width?: string | number

  /**
   * The space above the dialog.
   * This offset is also used at the bottom when there is not enough vertical
   * space available on screen — and the dialog scrolls internally.
   */
  topOffset?: string | number

  /**
   * The space on the left/right sides of the dialog when there isn't enough
   * horizontal space available on screen.
   */
  sideOffset?: string | number

  /**
   * Whether the dialog should not scroll internally. Default?: false
   */
  scrollBehavior?: 'inside' | 'outside'

  /**
   * The min height of the body content.
   * Makes it less weird when only showing little content.
   */
  minHeightContent?: string | number

  /**
   * Props that are passed to the dialog container.
   */
  containerProps?: object

  /**
   * Props that are passed to the content container.
   */
  contentContainerProps?: object

  /**
   * Whether or not to prevent scrolling in the outer body
   */
  preventBodyScrolling?: boolean
}

class Dialog extends React.Component<DialogProps> {
  static contextType = ThemeContext
  static defaultProps = {
    isShown: false,
    hasHeader: true,
    hasFooter: true,
    hasCancel: true,
    intent: 'none',
    width: 560,
    topOffset: '12vmin',
    sideOffset: '16px',
    minHeightContent: 80,
    confirmLabel: 'Confirm',
    isConfirmLoading: false,
    isConfirmDisabled: false,
    cancelLabel: 'Cancel',
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEscapePress: true,
    onCancel: (close: any) => close(),
    onConfirm: (close: any) => close(),
    preventBodyScrolling: false,
    scrollBehavior: 'inside'
  }

  renderChildren = (close: any) => {
    const { children } = this.props

    if (typeof children === 'function') {
      return children({ close })
    }
    if (typeof children === 'string') {
      return <Paragraph>{children}</Paragraph>
    }
    return children
  }

  render() {
    const {
      title,
      width,
      intent,
      isShown = false,
      topOffset,
      sideOffset,
      scrollBehavior,
      hasHeader,
      hasFooter,
      hasCancel,
      onCloseComplete,
      onOpenComplete,
      onCancel,
      onConfirm,
      confirmLabel,
      isConfirmLoading,
      isConfirmDisabled,
      cancelLabel,
      shouldCloseOnOverlayClick,
      shouldCloseOnEscapePress,
      containerProps,
      contentContainerProps,
      minHeightContent,
      preventBodyScrolling
    } = this.props

    const sideOffsetWithUnit = Number.isInteger(sideOffset as number)
      ? `${sideOffset}px`
      : sideOffset
    const maxWidth = `calc(100% - ${sideOffsetWithUnit} * 2)`

    const topOffsetWithUnit = Number.isInteger(topOffset as number)
      ? `${topOffset}px`
      : topOffset
    const maxHeight =
      scrollBehavior === 'inside' ? `calc(100% - ${topOffsetWithUnit} * 2)` : ``

    return (
      <Overlay
        isShown={isShown}
        shouldCloseOnClick={shouldCloseOnOverlayClick}
        shouldCloseOnEscapePress={shouldCloseOnEscapePress}
        onExited={onCloseComplete}
        onEntered={onOpenComplete}
        containerProps={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflowY: scrollBehavior === 'inside' ? '' : 'scroll'
        }}
        css={{ WebkitOverflowScrolling: 'touch' } as any}
        preventBodyScrolling={preventBodyScrolling}
      >
        {({ state, close }: any) => (
          <Pane
            role="dialog"
            backgroundColor="white"
            elevation={4}
            borderRadius={8}
            width={width}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            marginX={sideOffsetWithUnit}
            marginY={topOffsetWithUnit}
            display="flex"
            flexDirection="column"
            css={animationStyles}
            data-state={state}
            {...containerProps}
          >
            {hasHeader && (
              <Pane
                padding={16}
                flexShrink={0}
                borderBottom="muted"
                display="flex"
                alignItems="center"
              >
                <Heading is="h4" size={600} flex="1">
                  {title}
                </Heading>
                <IconButton
                  appearance="minimal"
                  icon={XIcon}
                  onClick={() => onCancel(close)}
                />
              </Pane>
            )}

            <Pane
              data-state={state}
              display="flex"
              overflow={scrollBehavior === 'inside' ? 'auto' : 'visible'}
              padding={16}
              flexDirection="column"
              minHeight={minHeightContent}
              {...contentContainerProps}
            >
              <Pane>{this.renderChildren(close)}</Pane>
            </Pane>

            {hasFooter && (
              <Pane borderTop="muted" clearfix>
                <Pane padding={16} float="right">
                  {/* Cancel should be first to make sure focus gets on it first. */}
                  {hasCancel && (
                    <Button
                      tabIndex={scrollBehavior === 'inside' ? 0 : null}
                      onClick={() => onCancel(close)}
                    >
                      {cancelLabel}
                    </Button>
                  )}

                  <Button
                    tabIndex={scrollBehavior ? 0 : null}
                    marginLeft={8}
                    appearance="primary"
                    isLoading={isConfirmLoading}
                    disabled={isConfirmDisabled}
                    onClick={() => onConfirm(close)}
                    intent={intent}
                  >
                    {confirmLabel}
                  </Button>
                </Pane>
              </Pane>
            )}
          </Pane>
        )}
      </Overlay>
    )
  }
}

export default Dialog
