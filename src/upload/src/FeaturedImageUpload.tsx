import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePluginImageTransform from 'filepond-plugin-image-transform'
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond'
import { Button, Pane, Text, ThemeContext } from '../../index'
import { PaneProps } from '../../layers/index'
import { generateStyles } from '../utils/generateStyles'

type FeaturedImageUploadProps = FilePondProps & {
  containerProps?: PaneProps
  fileValidateTypeLabelExpectedTypesMap?: object
  imageTransformOutputMimeType?: MimeType
  /**
   * @min 1
   * @max 100
   */
  imageTransformOutputQuality?: number
  height?: number
  width?: number
  onClick?: (filePond?: FilePond | null) => void
  [key: string]: any
}

class FeaturedImageUpload extends React.Component<FeaturedImageUploadProps> {
  filePondRef: FilePond | null

  state = { imageLoaded: false }

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
    className: 'parishconnect-upload',
    height: 350,
    width: 1200
  }

  componentWillMount() {
    registerPlugin(
      FilePondPluginFileValidateSize,
      FilePondPluginImagePreview,
      FilePondPluginImageCrop,
      FilePluginImageTransform,
      FilePondPluginFileValidateType,
      FilePondPluginImageResize
    )
  }

  render() {
    const {
      acceptedFileTypes,
      fileValidateTypeLabelExpectedTypesMap,
      imageTransformOutputMimeType,
      imageTransformOutputQuality,
      name,
      className,
      server,
      containerProps,
      height,
      width,
      ...rest
    } = this.props

    return (
      <Pane
        cursor="pointer"
        position="relative"
        onClick={(e: any) => {
          if (this.props.onClick) {
            if (e.target.className !== 'filepond--drop-label') {
              e.preventDefault()
              e.stopPropagation()
              this.props.onClick(this.filePondRef)
            }
          }
        }}
        css={generateStyles(this.context)}
        {...containerProps}
      >
        <FilePond
          allowBrowse={this.props.onClick ? false : true}
          server={server}
          onaddfile={error => {
            if (error) return
            this.setState({ imageLoaded: true })
          }}
          onremovefile={() => this.setState({ imageLoaded: false })}
          acceptedFileTypes={acceptedFileTypes}
          {...fileValidateTypeLabelExpectedTypesMap}
          {...imageTransformOutputMimeType}
          {...imageTransformOutputQuality}
          name={name}
          className={className}
          imageResizeMode="force"
          stylePanelLayout="integrated"
          stylePanelAspectRatio={`${width}:${height}`}
          imageCropAspectRatio={`${width}:${height}`}
          imageResizeTargetWidth={width}
          imagePreviewHeight={height}
          imageResizeTargetHeight={height}
          ref={ref => (this.filePondRef = ref)}
          imagePreviewMaxFileSize="2MB"
          instantUpload={false}
          labelIdle={ReactDOMServer.renderToString(
            <Text>
              Drag & Drop your files or
              <Button
                is="span"
                marginLeft={8}
                fontSize="12px !important"
                appearance="primary"
                onClick={
                  !this.props.onClick &&
                  this.filePondRef &&
                  this.filePondRef.browse
                }
              >
                Browse
              </Button>
            </Text>
          )}
          {...(rest as FilePondProps)}
        />
      </Pane>
    )
  }
}

export default FeaturedImageUpload
