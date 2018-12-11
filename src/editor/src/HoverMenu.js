import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { IconButton } from '../../buttons'
import { Card } from '../../layers'
import { Stack } from '../../stack/'
import { StackingOrder } from '../../constants'

export default class HoverMenu extends Component {
  static propTypes = {
    innerRef: PropTypes.func,
    editor: PropTypes.object,
    root: PropTypes.string
  }
  render() {
    const { innerRef } = this.props
    let root
    if (window.document.getElementById('overlay')) {
      root = window.document.getElementById(this.props.root || 'overlay')
    }
    root = window.document.getElementById(this.props.root || 'root')

    return ReactDOM.createPortal(
      <Stack value={StackingOrder.POSITIONER}>
        {zIndex => (
          <Card
            appearance="white"
            opacity={0}
            elevation={3}
            display="inline-flex"
            paddingY={5}
            paddingX={2.5}
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
        appearance={isActive ? 'primary' : 'minimal'}
        marginX={2.5}
        active={isActive ? true : undefined}
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
