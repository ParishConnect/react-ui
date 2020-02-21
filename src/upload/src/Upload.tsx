import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../../buttons'
import { Image } from '../../image'
import { Card, PaneProps } from '../../layers'
import { majorScale } from '../../scales'
import { ThemeContext } from '../../theme'
import { Text } from '../../typography'

export type UploadProps = PaneProps & {
  /**
   * Set accepted file types. See https://github.com/okonet/attr-accept for more information.
   * Keep in mind that mime type determination is not reliable across platforms.
   * CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows.
   * In some cases there might not be a mime type set at all. See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept?: string | string[]
  onUpload?: (files?: File[]) => void
  disabled?: boolean
  multiple?: boolean
}

export interface UploadFile extends File {
  /**
   * ID of the file on the server
   */
  id: string

  /**
   * Whether the file is temporarily stored on the server.
   */
  temporary: boolean
}

export default function Upload({
  accept = 'image/*',
  multiple = false,
  disabled,
  onUpload = () => {},
  width = majorScale(35),
  ...rest
}: UploadProps) {
  const theme = useContext(ThemeContext)
  const [files, setFiles] = useState<UploadFile[]>([])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    disabled
  })

  useEffect(() => {
    for (const file in acceptedFiles) {
      upload({ file })
    }
    setFiles(acceptedFiles)
  }, [acceptedFiles])

  useEffect(() => {
    onUpload(files)
  }, [files])

  return (
    <Card
      appearance="solid"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      paddingY={majorScale(2)}
      paddingX={majorScale(3)}
      outlineRadius={6}
      width={width}
      {...rest}
      css={{
        userSelect: 'none',
        ':focus': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${
            theme.palette[theme.themeColor].lightest
          }, 0 1px 1px 0 ${theme.palette[theme.themeColor].lightest}`
        }
      }}
      {...getRootProps({ className: 'drop' })}
    >
      <input hidden {...getInputProps()} />
      {!multiple && files.length <= 0 && (
        <Text>
          Drag & Drop your files or
          <Button marginLeft={majorScale(1)} appearance="primary">
            Browse
          </Button>
        </Text>
      )}
      {files?.map(file => (
        <ImagePreviewCard width={width} file={file} />
      ))}
    </Card>
  )
}

type ServerConfig = {}

/**
 * Uploads file to the server as a temporary image
 */
function upload({ file: File, config: ServerConfig }) {}

type ImagePreviewCardProps = {
  file: File
  width: number | string
}

function ImagePreviewCard({ file, width }: ImagePreviewCardProps) {
  return (
    <Image
      paddingY={majorScale(2)}
      paddingX={majorScale(3)}
      width={width}
      src={URL.createObjectURL(file)}
      borderRadius={8}
    />
  )
}
