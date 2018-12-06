import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AutoResizeTextArea from 'react-autosize-textarea'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Box from '@hennessyevan/aluminum-box'
import { IconButton } from '../../buttons'
import { Card } from '../../layers'
import { Heading } from '../../typography'
import { withTheme } from '../../theme'
import { Stack } from '../../stack/'
import { StackingOrder } from '../../constants'

const _initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: ''
      }
    ]
  }
})

class TitleBlock extends React.Component {
  static propTypes = {
    /**
     * Placeholder for title area. Default: Enter a title...
     */
    placeholder: PropTypes.string,
    onTitleChangeHandler: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter a title...'
  }

  state = {
    value: '',
    height: 36
  }

  titleBlockStyles = {
    fontFamily: `Georgia, 'Times New Roman', Times, serif`,
    resize: 'none',
    outline: 'none',
    overflow: 'hidden',
    overflowWrap: 'breakword',
    width: '100%',
    border: 'none',
    maxWidth: 500,
    height: this.state.height,
    marginBottom: 15,
    '::before': {
      content: this.state.value.length ? '' : '"Enter a title..."'
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value })
    this.props.onTitleChangeHandler(e.target.value)
  }

  render() {
    const { placeholder } = this.props

    return (
      <Heading
        is={AutoResizeTextArea}
        size={800}
        opacity={this.state.value ? 1 : 0.5}
        onChange={this.onChange}
        onKeyUp={this.setHeight}
        placeholder={placeholder}
        value={this.state.value}
        autocomplete="off"
        spellcheck="false"
        maxlength="100"
        aria-label={placeholder}
        css={this.titleBlockStyles}
      />
    )
  }
}

class HoverMenu extends React.Component {
  static propTypes = {
    innerRef: PropTypes.object,
    editor: PropTypes.object
  }
  render() {
    const { innerRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <Stack value={StackingOrder.POSITIONER}>
        {zIndex => (
          <Card
            appearance="white"
            opacity={0}
            elevation={1}
            display="inline-flex"
            padding={5}
            top={-10000}
            left={-10000}
            position="absolute"
            innerRef={innerRef}
            zIndex={zIndex}
          >
            {this.renderMarkButton('bold', 'bold')}
            {this.renderMarkButton('italic', 'italic')}
            {this.renderMarkButton('underline', 'underline')}
            {this.renderMarkButton('strikethrough', 'strikethrough')}
            {this.renderMarkButton('code', 'code')}
          </Card>
        )}
      </Stack>,
      root
    )
  }

  renderMarkButton(type, icon) {
    const { editor } = this.props
    const { value } = editor
    const isActive = value.activeMarks.some(mark => mark.type === type)
    return (
      <IconButton
        appearance="minimal"
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
        icon={icon}
      />
    )
  }

  onClickMark(event, type) {
    const { editor } = this.props
    event.preventDefault()
    editor.toggleMark(type)
  }
}

class EditorComponent extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    children: PropTypes.object || PropTypes.func,
    containerProps: PropTypes.object,
    hasTitle: PropTypes.bool,
    initialValue: PropTypes.object,
    mark: PropTypes.object,
    offset: PropTypes.number,
    onValueChange: PropTypes.func,
    onTitleChange: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    titlePlaceholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: 'Enter some text...',
    titlePlaceholder: 'Enter a title...'
  }

  state = {
    value: Value.fromJSON(this.props.initialValue || _initialValue)
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top +
      window.pageYOffset -
      menu.offsetHeight -
      this.props.offset}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  render() {
    return (
      <Editor
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.onChange}
        renderEditor={this.renderEditor}
        renderMark={this.renderMark}
        {...this.props}
      />
    )
  }

  renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <Box {...this.props.containerProps}>
        {this.props.hasTitle && (
          <TitleBlock
            onTitleChangeHandler={value => this.props.onTitleChange({ value })}
            placeholder={this.props.titlePlaceholder}
          />
        )}
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </Box>
    )
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'strikethrough':
        return <strike {...attributes}>{children}</strike>
      case 'underline':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })
    if (!this.props.readOnly) {
      this.props.onValueChange({ value })
    }
  }
}

export default withTheme(EditorComponent)
