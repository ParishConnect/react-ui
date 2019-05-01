import { getMarkAttrs } from '@remirror/core'
import {
  bubblePositioner,
  InjectedRemirrorProps,
  withRemirror
} from '@remirror/react'
import keyCode from 'keycode'
import * as React from 'react'
import { IconButton } from '../../../buttons/index'
import { CheckIcon, TrashIcon, UnlinkIcon } from '../../../icons/index'
import { Card } from '../../../layers/index'
import { minorScale, majorScale } from '../../../scales/index'
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
  constructor(props: LinkInputProps) {
    super(props)
    this.ref = React.createRef()
  }
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
      <Card ref={this.ref} padding={minorScale(1)} display="flex">
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
          <IconButton
            title="unlink"
            disabled={!canRemove || !this.state.href}
            icon={UnlinkIcon}
            onClick={this.onClickRemoveLink}
            appearance="minimal"
            intent="danger"
            marginRight={2}
          />
        )}
        <IconButton
          title="accept"
          intent="success"
          disabled={!this.state.href}
          icon={CheckIcon}
          appearance="minimal"
          onClick={this.submitLink}
        />
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
        getPositionerProps
      } = this.props

      const initialValue =
        getMarkAttrs(
          manager.getEditorState(),
          manager.getEditorState().schema.marks.link
        ).href || ''

      const { bottom, left, ref } = getPositionerProps({
        ...bubblePositioner,
        positionerId: 'link-manager'
      })

      return (
        <Card
          elevation={2}
          appearance="white"
          display="flex"
          padding={minorScale(1)}
          position="absolute"
          transform="translateX(-50%)"
          innerRef={ref}
          bottom={
            initialValue || linkActivated ? bottom + majorScale(1) : -9999
          }
          left={initialValue || linkActivated ? left : -9999}
        >
          <LinkInput
            {...{
              initialValue,
              deactivateLink,
              updateLink: this.updateLink,
              removeLink: this.removeLink,
              canRemove: this.canRemove
            }}
          />
        </Card>
      )
    }
  }
)
