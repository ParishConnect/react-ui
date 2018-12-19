import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoResizeTextArea from 'react-autosize-textarea'
import { Heading } from '../../typography'

export default class TitleBlock extends Component {
  static propTypes = {
    /**
     * Placeholder for title area. Default: Enter a title...
     */
    placeholder: PropTypes.string,
    onTitleChangeHandler: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string
  }

  static defaultProps = {
    placeholder: 'Enter a title...'
  }

  state = {
    value: this.props.value || '',
    height: 48
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
    marginLeft: -5,
    '::before': {
      content: this.state.value.length ? '' : '"Enter a title..."'
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value })
    this.props.onTitleChangeHandler(e.target.value)
  }

  render() {
    const { placeholder, readOnly } = this.props

    return (
      <Heading
        is={readOnly ? 'h2' : AutoResizeTextArea}
        size={900}
        opacity={this.state.value ? 1 : 0.5}
        onChange={this.onChange}
        onKeyUp={this.setHeight}
        placeholder={placeholder}
        value={this.state.value}
        autoComplete="off"
        spellCheck="false"
        maxLength="100"
        aria-label={placeholder}
        css={this.titleBlockStyles}
      >
        {readOnly && this.state.value}
      </Heading>
    )
  }
}
