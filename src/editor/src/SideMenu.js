import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from '@hennessyevan/aluminum-box'
import { IconButton } from '../../buttons'
import { Popover } from '../../popover'
import { Tooltip } from '../../tooltip'
import { Position } from '../../constants'

const DEFAULT_NODE = 'paragraph'

export default class SideMenu extends Component {
  static propTypes = {
    /**
     * The receiving editor. Must be passed to the SideMenu Component
     */
    editor: PropTypes.object,
    /**
     * Passed to the Editor component
     */
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }
  render() {
    return (
      <Popover
        statelessProps={{
          padding: 5,
          minWidth: 0
        }}
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
        position={Position.BOTTOM_LEFT}
        content={
          <Box display="inline-flex">
            {this.renderBlockButton('heading-one', 'header-one', 'Header 1')}
            {this.renderBlockButton('heading-two', 'header-two', 'Header 2')}
            {this.renderBlockButton('block-quote', 'citation', 'Quote')}
            {this.renderBlockButton(
              'numbered-list',
              'numbered-list',
              'Numbered List'
            )}
            {this.renderBlockButton('bulleted-list', 'list', 'Bulleted List')}
          </Box>
        }
      >
        <IconButton appearance="minimal" borderRadius={50} icon="plus" />
      </Popover>
    )
  }

  hasBlock = type => {
    const { editor: { value } } = this.props
    return value.blocks.some(node => node.type === type)
  }

  renderBlockButton = (type, icon, tooltip) => {
    const { editor } = this.props

    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = editor
      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <Tooltip content={tooltip}>
        <IconButton
          appearance="minimal"
          active={isActive}
          onMouseDown={event => this.onClickBlock(event, type)}
          icon={icon}
        />
      </Tooltip>
    )
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this.props
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
    editor.focus()
  }
}
