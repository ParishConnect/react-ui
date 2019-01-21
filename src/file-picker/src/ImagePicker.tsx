import * as React from 'react'
import Dropzone from 'react-dropzone'
import { Omit } from 'utility-types'
import Box from '@hennessyevan/aluminum-box'
import { Pane, Card, PaneProps } from '../../layers'
import { Icon } from '../../icon'
import { Button } from '../../buttons'
import { ThemeContext } from '../../theme'
import { Heading } from '../../typography'
import { BackgroundColor } from '../../constants/index'

export const CLASS_PREFIX = 'evergreen-image-picker'

export interface ImagePickerProps extends Omit<PaneProps, 'background'> {
  background?: BackgroundColor | string
  name?: string
  icon?: string
  accept?: string | string[]
  required?: boolean
  disabled?: boolean
  capture?: boolean
  height?: string | number
  width?: string | number
  onChange?: any
  onRepositionComplete?: any
}

interface ImagePickerState {
  image: any
  preview: any
  repositioning: boolean
  correctedHeight?: number | string
}

class ImagePicker extends React.Component<ImagePickerProps, ImagePickerState> {
  static contextType = ThemeContext

  static defaultProps = {
    width: '100%',
    height: 350,
    icon: 'add',
    background: 'tint2'
  }

  state: ImagePickerState = {
    image: {},
    preview: '',
    repositioning: false
  }

  startingPoint = 0
  mouseInside: boolean
  mouseDown: boolean
  container: any
  currPositionY: any
  dropzone: any

  handleMouseMove = (e: MouseEvent) => {
    if (!this.mouseInside || !this.mouseDown) return
    e.preventDefault()

    const { correctedHeight = 0 } = this.state

    // Calculate dragDistance from starting point
    let dragDistance = e.pageY - this.startingPoint + this.currPositionY
    if (dragDistance > 0) dragDistance = 0
    if (dragDistance < -correctedHeight) dragDistance = -correctedHeight
    this.container.style.backgroundPositionY = dragDistance + 'px'
  }

  shouldComponentUpdate() {
    return !this.mouseDown
  }

  handleMouseDown = (e: MouseEvent) => {
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
    const theme = this.context
    return {
      '::before': {
        // tslint:disable-next-line:quotemark
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
      background = 'tint2',
      disabled,
      height = 350,
      width = '100%',
      // tslint:disable-next-line:no-unused
      onChange, // Remove onChange from props
      ...props
    } = this.props
    const theme = this.context
    const { preview, correctedHeight, repositioning } = this.state

    const repositioningShadow = repositioning
      ? this.getRepositioningShadow()
      : {}

    return (
      <Dropzone
        multiple={false}
        accept="image/png,image/jpg,image/jpeg"
        onDrop={this.handleImageDrop}
        disableClick={Boolean(preview)}
        ref={node => (this.dropzone = node)}
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
                  ? isDragActive
                    ? (`${theme.themeColor}Tint` as BackgroundColor)
                    : (background as BackgroundColor)
                  : undefined
              }
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition={
                correctedHeight
                  ? `center  -${(correctedHeight as number) / 2}px`
                  : 'center'
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
              {preview && repositioning && (
                <Card
                  padding="1rem"
                  backgroundColor="white"
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

  setInitialPosition = ({ height, width }: any) => {
    const containerWidth = parseInt(
      getComputedStyle(this.container).getPropertyValue('width'),
      10
    )
    const diff = containerWidth / width
    const propsHeight = Number(this.props.height)
    this.setState({
      correctedHeight: Math.floor(height * diff - propsHeight)
    })
  }

  readURL = (file: any) => {
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      new Promise(resolve => {
        const i = new Image()
        i.onload = () => {
          resolve({ height: i.height, width: i.width })
        }
        i.src = reader.result as any
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

  handleImageDrop = (image: any) => {
    this.readURL(image[0])

    this.setState({
      image: image[0]
    })
  }
}

export default ImagePicker
