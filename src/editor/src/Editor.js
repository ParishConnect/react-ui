import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Html from 'slate-html-serializer'
import Box from '@hennessyevan/aluminum-box'
import { withTheme } from '../../theme'
import {
  Heading,
  Code,
  Strong,
  ListItem,
  OrderedList,
  UnorderedList
} from '../../typography'
import SideMenu from './SideMenu'
import HoverMenu from './HoverMenu'
import TitleBlock from './TitleBlock'
import {
  RULES,
  initialValue,
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  getBlockquoteStyle
} from './helpers'

class EditorComponent extends Component {
  static propTypes = {
    isEditor: PropTypes.bool.isRequired,
    attributes: PropTypes.object,
    children: PropTypes.object || PropTypes.func,
    containerProps: PropTypes.object,
    hasTitle: PropTypes.bool,
    initialValue: PropTypes.object,
    mark: PropTypes.object,
    node: PropTypes.object,
    offset: PropTypes.number,
    onValueChange: PropTypes.func,
    onTitleChange: PropTypes.func,
    placeholder: PropTypes.string,
    provideHTML: PropTypes.bool,
    readOnly: PropTypes.bool,
    infoNode: PropTypes.node,
    theme: PropTypes.object.isRequired,
    title: PropTypes.string,
    titlePlaceholder: PropTypes.string
  }

  static defaultProps = {
    isEditor: true,
    placeholder: 'Enter some text...',
    titlePlaceholder: 'Enter a title...'
  }

  state = {
    value: Value.fromJSON(this.props.initialValue || initialValue),
    sideMenuIsOpen: false
  }

  componentDidMount = () => {
    if (!this.props.readOnly) {
      this.updateSideMenu()
      this.updateHoverMenu()
    }
  }

  componentDidUpdate = () => {
    if (!this.props.readOnly) {
      this.updateSideMenu()
      this.updateHoverMenu()
    }
  }

  updateHoverMenu = () => {
    const hoverMenu = this.hoverMenu
    if (!hoverMenu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      hoverMenu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    hoverMenu.style.opacity = 1
    hoverMenu.style.top = `${rect.top +
      window.pageYOffset -
      hoverMenu.offsetHeight -
      this.props.offset}px`

    hoverMenu.style.left = `${rect.left +
      window.pageXOffset -
      hoverMenu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  updateSideMenu = () => {
    const sideMenu = this.sideMenu
    if (!sideMenu) return

    const { value } = this.state
    const { selection } = value

    if (selection.isBlurred && !this.state.sideMenuIsOpen) {
      setTimeout(() => {
        if (!this.state.sideMenuIsOpen) {
          sideMenu.removeAttribute('style')
        }
      }, 150)
      return
    }

    let scrollOffset = 0
    if (window.document.getElementById('overlay')) {
      scrollOffset = window.document.getElementById('overlay').scrollTop
    }
    try {
      const native = window.getSelection()
      const range = native.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      sideMenu.style.opacity = 1
      sideMenu.style.top = `${rect.top +
        scrollOffset +
        rect.height / 2 +
        window.pageYOffset -
        sideMenu.offsetHeight / 2}px`

      sideMenu.style.left = `${this.container.getBoundingClientRect().x}px`
    } catch (err) {}
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  handleTab = editor => {
    const isList = this.hasBlock('list-item')
    if (isList) {
      editor.wrapBlock('list-item')
    }
  }

  onKeyDown = (event, editor, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underline'
    } else {
      return next()
    }

    event.preventDefault()
    if (mark) editor.toggleMark(mark)
  }

  render() {
    return (
      <Editor
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderEditor={this.renderEditor}
        renderNode={this.renderNode}
        renderMark={this.renderMark}
        {...this.props}
      />
    )
  }

  renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <Fragment>
        <Box
          innerRef={container => (this.container = container)}
          padding={50}
          position="relative"
          {...this.props.containerProps}
        >
          {this.props.hasTitle && (
            <TitleBlock
              value={this.props.title}
              onTitleChangeHandler={value =>
                this.props.onTitleChange({ value })
              }
              placeholder={this.props.titlePlaceholder}
            />
          )}
          {this.props.infoNode && <div>{this.props.infoNode}</div>}
          {!this.props.readOnly && (
            <SideMenu
              onOpen={() => {
                this.setState({ sideMenuIsOpen: true })
                this.updateSideMenu()
              }}
              onClose={() => this.setState({ sideMenuIsOpen: false })}
              innerRef={sideMenu => (this.sideMenu = sideMenu)}
              value={this.state.value}
              editor={editor}
            />
          )}
          {children}
          {!this.props.readOnly && (
            <HoverMenu
              innerRef={hoverMenu => (this.hoverMenu = hoverMenu)}
              editor={editor}
            />
          )}
        </Box>
      </Fragment>
    )
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return (
          <Strong size={500} {...attributes}>
            {children}
          </Strong>
        )
      case 'code':
        return <Code {...attributes}>{children}</Code>
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

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props
    const { theme } = this.props

    switch (node.type) {
      case 'block-quote':
        return (
          <Box is="blockquote" {...getBlockquoteStyle(theme)} {...attributes}>
            {children}
          </Box>
        )
      case 'bulleted-list':
        return (
          <UnorderedList is="ul" {...attributes}>
            {children}
          </UnorderedList>
        )
      case 'heading-one':
        return (
          <Heading size={800} is="h1" {...attributes}>
            {children}
          </Heading>
        )
      case 'heading-two':
        return (
          <Heading size={600} is="h2" {...attributes}>
            {children}
          </Heading>
        )
      case 'list-item':
        return (
          <ListItem is="li" {...attributes}>
            {children}
          </ListItem>
        )
      case 'numbered-list':
        return (
          <OrderedList is="ol" {...attributes}>
            {children}
          </OrderedList>
        )
      default:
        return next()
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })

    if (!this.props.readOnly) {
      if (this.props.provideHTML && this.props.onValueChange) {
        const html = new Html({ rules: RULES, defaultBlock: 'span' }).serialize(
          value
        )
        this.props.onValueChange({ value, html })
      } else if (this.props.onValueChange) {
        this.props.onValueChange({ value })
      }
    }
  }
}

export default withTheme(EditorComponent)
