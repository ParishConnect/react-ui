import { splitBoxProps } from '@parishconnect/box'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePluginImageTransform from 'filepond-plugin-image-transform'
import * as React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { Overwrite } from 'utility-types'
import { Pane, PaneProps } from '../../layers/index'
import { ThemeContext } from '../../theme/index'
import { generateStyles } from '../utils/generateStyles'

export interface UploadProps extends Overwrite<PaneProps, FilePond> {}

export default class Upload extends React.Component<UploadProps> {
  filePondRef: FilePond | null
  constructor(props: UploadProps) {
    super(props)
    registerPlugin(
      FilePondPluginFileValidateSize,
      FilePondPluginImagePreview,
      FilePluginImageCrop,
      FilePluginImageTransform,
      FilePondPluginFileValidateType
    )
  }

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

  render() {
    const { matched, remaining } = splitBoxProps(this.props as any)
    return (
      <Pane css={generateStyles(this.context)} {...matched}>
        <FilePond
          {...remaining}
          allowMultiple
          maxFiles={3}
          ref={ref => (this.filePondRef = ref)}
        />
      </Pane>
    )
  }
}
