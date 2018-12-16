import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { Pane } from '../../layers'
import { Icon } from '../../icon'
import { withTheme } from '../../theme'

export const CLASS_PREFIX = 'evergreen-image-picker'

class ImagePicker extends Component {
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
    onChange: PropTypes.func,
    onRepositionComplete: PropTypes.func,
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    width: '100%',
    height: 350,
    icon: 'add',
    background: 'tint2'
  }

  constructor() {
    super()

    this.startingPoint = 0

    this.state = {
      image: {},
      preview: '',
      dragDistance: 0,
      imageHeight: null
    }
  }

  handleMouseMove = e => {
    if (!this.mouseInside || !this.mouseDown) return
    e.preventDefault()

    const { correctedHeight } = this.state

    // Calculate dragDistance from starting point
    let dragDistance = e.pageY - this.startingPoint + this.currPositionY
    if (dragDistance > 0) dragDistance = 0
    if (dragDistance < -correctedHeight) dragDistance = -correctedHeight
    this.container.style.backgroundPositionY = dragDistance + 'px'
    this.setState({ dragDistance })
  }

  shouldComponentUpdate() {
    return !this.mouseDown
  }

  handleMouseDown = e => {
    this.mouseDown = true
    this.startingPoint = e.clientY
  }

  handleMouseUp = () => {
    this.mouseDown = false
    this.currPositionY = parseInt(
      getComputedStyle(this.container).getPropertyValue(
        'background-position-y'
      ),
      10
    )
    this.props.onRepositionComplete(this.currPositionY)
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(this.state.image.preview)
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
      theme,
      ...props
    } = this.props
    const { preview, dragDistance, correctedHeight } = this.state

    return (
      <Dropzone
        multiple={false}
        accept="image/png,image/jpg,image/jpeg"
        onDrop={this.handleImageDrop.bind(this)}
        disableClick={Boolean(preview)}
        innerRef={node => (this.dropzone = node)}
      >
        {({ getInputProps, getRootProps, isDragActive, isDragReject }) => {
          return (
            <Pane
              innerRef={node => (this.container = node)}
              cursor={preview ? 'ns-resize' : 'pointer'}
              onMouseEnter={preview ? () => (this.mouseInside = true) : null}
              onMouseLeave={preview ? () => (this.mouseInside = false) : null}
              onMouseDown={preview ? this.handleMouseDown : null}
              onMouseUp={preview ? this.handleMouseUp : null}
              onMouseMove={this.handleMouseMove}
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundImage={preview && `url(${preview})`}
              background={
                !preview
                  ? isDragActive ? `${theme.themeColor}Tint` : background
                  : ''
              }
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition={
                correctedHeight ? `center  -${correctedHeight / 2}px` : 'center'
              }
              disabled={disabled}
              width={width}
              height={height}
              {...props}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!preview && (
                <Icon
                  className={`${CLASS_PREFIX}-button`}
                  background={
                    isDragActive && !isDragReject
                      ? theme.palette[theme.themeColor].light
                      : '#DDDDDD'
                  }
                  padding={15}
                  borderRadius={100}
                  boxSizing="content-box"
                  size={32}
                  color={isDragActive ? theme.getThemeColor(theme) : 'muted'}
                  icon={isDragReject ? 'cross' : 'plus'}
                />
              )}
              <div
                style={{
                  color: 'white',
                  position: 'absolute',
                  bottom: 10,
                  right: 0
                }}
              >
                Drag Distance: {dragDistance}
                <br />
                Image Height: {this.state.imageHeight}
                <br />
                Corrected Height: {this.state.correctedHeight}
              </div>
            </Pane>
          )
        }}
      </Dropzone>
    )
  }

  setInitialPosition = ({ height, width }) => {
    const containerWidth = parseInt(
      getComputedStyle(this.container).getPropertyValue('width'),
      10
    )
    const diff = containerWidth / width
    this.setState({
      correctedHeight: Math.floor(height * diff - this.props.height)
    })
  }

  readURL = file => {
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      new Promise(resolve => {
        const i = new Image()
        i.onload = () => {
          resolve({ height: i.height, width: i.width })
        }
        i.src = reader.result
      }).then(resolve => {
        this.setInitialPosition(resolve)

        this.setState(
          {
            preview: reader.result,
            imageHeight: resolve.height
          },
          () => {
            this.props.onChange({
              image: resolve,
              preview: reader.result,
              correctedHeight: this.state.correctedHeight,
              file
            })
          }
        )
      })
    }
    reader.readAsDataURL(file)
  }

  handleImageDrop = image => {
    this.readURL(image[0])

    this.setState({
      image: image[0]
    })
  }
}

export default withTheme(ImagePicker)
