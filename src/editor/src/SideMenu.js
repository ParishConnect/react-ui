import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Box from '@hennessyevan/aluminum-box'
import { IconButton } from '../../buttons'
import { Tooltip } from '../../tooltip'
import { Card } from '../../layers'
import { Stack } from '../../stack/'
import { StackingOrder } from '../../constants'

const DEFAULT_NODE = 'paragraph'

export default class SideMenu extends Component {
  state = {
    isShown: false
  }
  static propTypes = {
    /**
     * When true, the Popover is manually shown.
     */
    isShown: PropTypes.bool,
    innerRef: PropTypes.func.isRequired,
    /**
     * The receiving editor. Must be passed to the SideMenu Component
     */
    editor: PropTypes.object.isRequired,
    /**
     * Optionally specify where to create the react Portal
     */
    root: PropTypes.string,
    /**
     * Function called when the Sidemenu opens.
     */
    onOpen: PropTypes.func,
    /**
     * Function called when the Sidemenu opens.
     */
    onClose: PropTypes.func,
    value: PropTypes.object
  }

  static defaultProps = {
    onOpen: () => {},
    onClose: () => {},
    onOpenComplete: () => {},
    onCloseComplete: () => {}
  }

  open = () => {
    this.setState({ isShown: true })
    this.props.onOpen()
  }

  close = () => {
    this.setState({ isShown: false })
    setTimeout(() => {
      this.props.onClose()
    }, 300)
  }

  toggle = () => {
    if (this.state.isShown) {
      this.close()
    } else {
      this.open()
    }
  }

  render() {
    const { innerRef, isShown } = this.props
    const { isShown: stateIsShown } = this.state
    let root
    if (window.document.getElementById('overlay')) {
      root = window.document.getElementById(this.props.root || 'overlay')
    } else {
      root = window.document.getElementById(this.props.root || 'root')
    }

    const shown = isShown || stateIsShown

    return ReactDOM.createPortal(
      <Stack value={StackingOrder.TOASTER}>
        {zIndex => (
          <Box
            top={-10000}
            left={-10000}
            opacity={0}
            position="absolute"
            zIndex={zIndex}
            innerRef={innerRef}
          >
            <IconButton
              onClick={this.toggle}
              transform={shown ? 'rotate(45deg)' : ''}
              transformOrigin="center"
              transition="transform 125ms"
              appearance="minimal"
              borderRadius={50}
              icon="plus"
            />
            {shown && (
              <Card
                appearance="white"
                position="absolute"
                transform="translateY(10px)"
                elevation={3}
                display="inline-flex"
                paddingY={5}
                paddingX={2.5}
              >
                {this.renderBlockButton(
                  'heading-one',
                  'header-one',
                  'Header 1'
                )}
                {this.renderBlockButton(
                  'heading-two',
                  'header-two',
                  'Header 2'
                )}
                {this.renderBlockButton('block-quote', 'citation', 'Quote')}
                {this.renderBlockButton(
                  'numbered-list',
                  'numbered-list',
                  'Numbered List'
                )}
                {this.renderBlockButton(
                  'bulleted-list',
                  'list',
                  'Bulleted List'
                )}
              </Card>
            )}
          </Box>
        )}
      </Stack>,
      root
    )
  }

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  renderBlockButton = (type, icon, tooltip) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.props
      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <Tooltip content={tooltip}>
        <IconButton
          appearance={isActive ? 'primary' : 'minimal'}
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
    const { document } = editor.value

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

      const isType = editor.value.blocks.some(block => {
        console.log(block.key)

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
