import { getMarkAttrs } from '@remirror/core'
import {
  bubblePositioner,
  InjectedRemirrorProps,
  withRemirror
} from '@remirror/react'
import keyCode from 'keycode'
import * as React from 'react'
import { IconButton } from '../../../buttons/index'
import { CheckIcon, TrashIcon } from '../../../icons/index'
import { Card } from '../../../layers/index'
import { minorScale } from '../../../scales/index'
import { TextInput } from '../../../text-input/index'
import { Tooltip } from '../../../tooltip/index'
import { Popover } from '../../../popover/index'

interface LinkInputProps {
  updateLink(href: string): void
  removeLink(): void
  deactivateLink(): void
  canRemove(): boolean
  initialValue: string
}

interface LinkInputState {
  href: string
}

class LinkInput extends React.Component<LinkInputProps, LinkInputState> {
  ref: any
  inputRef: any
  state: LinkInputState = { href: this.props.initialValue }

  onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ href: e.target.value })
  }

  submitLink = () => {
    const { updateLink, deactivateLink } = this.props
    updateLink(this.state.href)
    deactivateLink()
  }

  onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const { deactivateLink } = this.props
    if (keyCode.isEventKey(e.nativeEvent, 'esc')) {
      e.preventDefault()
      deactivateLink()
    }

    if (keyCode.isEventKey(e.nativeEvent, 'enter')) {
      e.preventDefault()
      this.submitLink()
    }
  }

  onClickRemoveLink: React.DOMAttributes<HTMLButtonElement>['onClick'] = e => {
    const { removeLink, deactivateLink } = this.props
    e.preventDefault()
    removeLink()
    deactivateLink()
  }

  handleClick = (e: MouseEvent) => {
    const { deactivateLink } = this.props
    if (!this.ref.current || this.ref.current.contains(e.target as Node)) {
      return
    }
    deactivateLink()
  }

  componentDidUpdate(prevProps: LinkInputProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ href: this.props.initialValue })
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  render() {
    const { canRemove } = this.props
    return (
      <Card
        padding={minorScale(1)}
        display="flex"
        innerRef={ref => (this.ref = ref)}
      >
        <TextInput
          autoFocus
          innerRef={this.inputRef}
          placeholder="Enter URL..."
          onChange={this.onChange}
          value={this.state.href}
          onSubmit={this.submitLink}
          onKeyPress={this.onKeyPress}
          borderWidth="none"
          css={{ boxShadow: 'none', '&:focus': { boxShadow: 'none' } }}
        />
        {canRemove && (
          <Tooltip position="top" content="Unlink">
            <IconButton
              disabled={!canRemove || !this.state.href}
              icon={TrashIcon}
              onClick={this.onClickRemoveLink}
              appearance="minimal"
              intent="danger"
              marginRight={2}
            />
          </Tooltip>
        )}
        <Tooltip position="top" content="Accept">
          <IconButton
            intent="success"
            disabled={!this.state.href}
            icon={CheckIcon}
            appearance="minimal"
            onClick={this.submitLink}
          />
        </Tooltip>
      </Card>
    )
  }
}

interface LinkManagerProps extends InjectedRemirrorProps {
  linkActivated: boolean
  deactivateLink(): void
  activateLink(): void
}

export default withRemirror(
  class LinkManager extends React.Component<LinkManagerProps> {
    updateLink = (href: string) =>
      this.props.actions.linkUpdate.command({ href })
    removeLink = () => this.props.actions.linkRemove.command()
    canRemove = () => this.props.actions.linkRemove.isActive()

    render() {
      const {
        deactivateLink,
        linkActivated = false,
        manager,
        view,
        state
      } = this.props

      const initialValue =
        getMarkAttrs(
          manager.getEditorState(),
          manager.getEditorState().schema.marks.link
        ).href || ''

      return (
        <Popover
          position="top"
          statelessProps={{ minWidth: 64 }}
          isShown={initialValue || linkActivated ? true : false}
          content={
            <LinkInput
              {...{
                initialValue,
                deactivateLink,
                updateLink: this.updateLink,
                removeLink: this.removeLink,
                canRemove: this.canRemove
              }}
            />
          }
        >
          {({ getRef }) => {
            const target = view.nodeDOM(state.newState.selection.anchor)
            return getRef(target)
          }}
        </Popover>
      )
    }
  }
)