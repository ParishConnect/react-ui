import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Box from '@hennessyevan/aluminum-box'
import { Pane } from '../../layers'
import { Icon } from '../../icon'

export const CLASS_PREFIX = 'evergreen-image-picker'

export default class ImagePicker extends PureComponent {
  static propTypes = {
    background: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    accept: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    capture: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  }

  static defaultProps = {
    width: '100%',
    height: '100%',
    icon: 'add',
    background: 'tint2'
  }

  constructor() {
    super()

    this.state = {
      src: ''
    }
  }

  render() {
    const {
      name,
      background,
      icon,
      accept,
      required,
      disabled,
      capture,
      height,
      width,
      onChange, // Remove onChange from props
      ...props
    } = this.props
    const { src } = this.state

    return (
      <Fragment>
        <Box
          innerRef={this.fileInputRef}
          className={`${CLASS_PREFIX}-file-input`}
          is="input"
          type="file"
          name={name}
          accept={accept}
          required={required}
          disabled={disabled}
          capture={capture}
          onChange={this.handleFileChange}
          display="none"
        />

        <Pane
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundImage={src && `url(${src})`}
          background={!src && background}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          className={`${CLASS_PREFIX}-root`}
          onClick={this.handleButtonClick}
          disabled={disabled}
          width={width}
          height={height}
          {...props}
        >
          {!src && (
            <Icon
              className={`${CLASS_PREFIX}-button`}
              background="#DDDDDD"
              padding={15}
              borderRadius={100}
              boxSizing="content-box"
              size={32}
              color="muted"
              icon="plus"
            />
          )}
        </Pane>
      </Fragment>
    )
  }

  readURL = file => {
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({
        src: reader.result
      })
    }
    reader.readAsDataURL(file)
  }

  fileInputRef = node => {
    this.fileInput = node
  }

  handleFileChange = e => {
    const { onChange } = this.props
    // Firefox returns the same array instance each time for some reason
    const file = e.target.files[0]

    this.readURL(file)

    if (onChange) {
      onChange(file)
    }
  }

  handleButtonClick = () => {
    this.fileInput.click()
  }
}
