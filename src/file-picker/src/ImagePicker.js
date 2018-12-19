import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Box from '@hennessyevan/aluminum-box'
import { Pane, Card } from '../../layers'
import { Icon } from '../../icon'
import { Button } from '../../buttons'
import { withTheme } from '../../theme'
import { Heading } from '../../typography'

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
      repositioning: false
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
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(this.state.image.preview)
  }

  getRepositioningShadow = () => {
    const { theme } = this.props
    return {
      '::before': {
        content: "''",
        width: '100%',
        height: '100%',
        display: 'block',
        boxShadow: `inset 0 0 0 10px ${theme.scales.neutral.N6A}`
      }
    }
  }

  handleRepositioning = () => {
    const { repositioning } = this.state
    if (repositioning) {
      this.setState({
        repositioning: false
      })
      if (this.props.onRepositionComplete)
        this.props.onRepositionComplete(this.currPositionY)
    } else {
      this.setState({
        repositioning: true
      })
      this.mouseInside = true
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
      theme,
      ...props
    } = this.props
    const { preview, correctedHeight, repositioning } = this.state

    const repositioningShadow = repositioning
      ? this.getRepositioningShadow()
      : {}

    return (
      <Dropzone
        multiple={false}
        accept="image/png,image/jpg,image/jpeg"
        onDrop={this.handleImageDrop.bind(this)}
        disableClick={Boolean(preview)}
        innerRef={node => (this.dropzone = node)}
      >
        {({
          getInputProps,
          getRootProps,
          isDragActive,
          isDragReject,
          open
        }) => {
          return (
            <Pane
              innerRef={node => (this.container = node)}
              cursor={
                preview ? (repositioning ? 'ns-resize' : 'default') : 'pointer'
              }
              onMouseEnter={
                repositioning ? () => (this.mouseInside = true) : null
              }
              onMouseLeave={
                repositioning ? () => (this.mouseInside = false) : null
              }
              onMouseDown={repositioning ? this.handleMouseDown : null}
              onMouseUp={repositioning ? this.handleMouseUp : null}
              onMouseMove={repositioning ? this.handleMouseMove : null}
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
              css={{ ...repositioningShadow }}
              {...props}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {preview && (
                <Box position="absolute" bottom={25} right={25}>
                  <Button
                    marginRight={15}
                    appearance="default"
                    onClick={() => open()}
                    iconAfter="plus"
                  >
                    Change Image
                  </Button>
                  <Button
                    onClick={this.handleRepositioning}
                    appearance={repositioning ? 'primary' : 'default'}
                    intent={repositioning ? 'success' : 'none'}
                    iconAfter={repositioning ? 'tick' : 'arrows-vertical'}
                  >
                    {repositioning ? 'Save Position' : 'Reposition'}
                  </Button>
                </Box>
              )}
              {preview &&
                repositioning && (
                  <Card
                    padding="1rem"
                    background="white"
                    elevation={2}
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    userSelect="none"
                    pointerEvents="none"
                  >
                    <Heading size={200} color="theme">
                      Drag&nbsp;to&nbsp;reposition
                    </Heading>
                  </Card>
                )}
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
            preview: reader.result
          },
          () => {
            if (this.props.onChange) {
              this.props.onChange({
                image: resolve,
                preview: reader.result,
                correctedHeight: this.state.correctedHeight,
                file
              })
            }
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
