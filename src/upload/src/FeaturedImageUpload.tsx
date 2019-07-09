import * as React from 'react'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePluginImageTransform from 'filepond-plugin-image-transform'
import { Pane, Text, Button, ThemeContext, Card } from '../../index'
import { generateStyles } from '../utils/generateStyles'
import { FilePond, registerPlugin } from 'react-filepond'
import ReactDOMServer from 'react-dom/server'
import { splitBoxProps } from '@parishconnect/box'
import { majorScale } from '../../scales/index'

class FeaturedImageUpload extends React.Component<any> {
  filePondRef: FilePond | null
  setImageCropCenter: any
  startingY: any
  cropCenterY: any

  constructor(props) {
    super(props)
    registerPlugin(
      FilePondPluginFileValidateSize,
      FilePondPluginImagePreview,
      FilePondPluginImageCrop,
      FilePluginImageTransform,
      FilePondPluginFileValidateType,
      FilePondPluginImageResize
    )
  }

  state = { imageLoaded: false, hover: false }

  static contextType = ThemeContext

  static defaultProps = {
    acceptedFileTypes: ['image/png', 'image/jpeg'],
    fileValidateTypeLabelExpectedTypesMap: {
      'image/jpeg': '.jpg',
      'image/png': '.png'
    },
    imageTransformOutputMimeType: 'image/jpeg',
    imageTransformOutputQuality: 70,
    name: 'parishconnect-upload',
    className: 'parishconnect-upload'
  }

  handleReposition = e => {
    if (this.state.imageLoaded) {
      const leftMouseButtonOnlyDown =
        e.buttons === undefined ? e.which === 1 : e.buttons === 1

      if (leftMouseButtonOnlyDown) {
        this.cropCenterY = this.cropCenterY + -e.movementY / 900

        if (this.cropCenterY <= 0.15) this.cropCenterY = 0.15
        if (this.cropCenterY >= 0.85) this.cropCenterY = 0.85

        this.setImageCropCenter({ x: 0.5, y: this.cropCenterY })
      }
    }
  }

  render() {
    const {
      acceptedFileTypes,
      fileValidateTypeLabelExpectedTypesMap,
      imageTransformOutputMimeType,
      imageTransformOutputQuality,
      name,
      className
    } = this.props
    const { matched, remaining } = splitBoxProps(this.props as any)
    return (
      <Pane
        cursor={this.state.imageLoaded && 'ns-resize'}
        onClick={e => (this.startingY = e.clientY)}
        onMouseMove={this.handleReposition}
        onMouseOver={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        css={generateStyles(this.context)}
        {...matched}
      >
        <FilePond
          onaddfile={(error, file: any) => {
            if (error) return

            this.setState({ imageLoaded: true })
            this.cropCenterY = 0.5
            this.setImageCropCenter = file.setImageCropCenter
          }}
          onremovefile={() => this.setState({ imageLoaded: false })}
          acceptedFileTypes={acceptedFileTypes}
          fileValidateTypeLabelExpectedTypesMap={
            fileValidateTypeLabelExpectedTypesMap
          }
          imageTransformOutputMimeType={imageTransformOutputMimeType}
          imageTransformOutputQuality={imageTransformOutputQuality}
          name={name}
          className={className}
          imageResizeMode="force"
          stylePanelLayout="integrated"
          stylePanelAspectRatio="1200:350"
          imageCropAspectRatio="1200:350"
          imageResizeTargetWidth={1200}
          imagePreviewHeight={350}
          imageResizeTargetHeight={350}
          ref={ref => (this.filePondRef = ref)}
          imagePreviewMaxFileSize="2MB"
          instantUpload={false}
          {...remaining}
          labelIdle={ReactDOMServer.renderToString(
            <Text>
              Drag & Drop an image or
              <Button
                is="span"
                marginLeft={8}
                fontSize="12px !important"
                appearance="primary"
                onClick={() => this.filePondRef.browse()}
              >
                Browse
              </Button>
            </Text>
          )}
        />
        <Card
          opacity={this.state.hover && this.state.imageLoaded ? 1 : 0}
          pointerEvents="none"
          position="absolute"
          top="50%"
          left="50%"
          transform="translateX(-50%) translateY(-50%)"
          background="rgba(0,0,0,0.5)"
          padding={majorScale(2)}
          transition="300ms"
          color="white"
        >
          Drag to Reposition
        </Card>
      </Pane>
    )
  }
}

export default FeaturedImageUpload
