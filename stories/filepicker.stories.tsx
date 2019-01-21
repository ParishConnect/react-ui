import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { FilePicker, ImagePicker } from '../src'

storiesOf('file-picker', module)
  .add('FilePicker', () => (
    <Box padding={40}>
      {(() => {
        document.body.style.margin = '0'
        document.body.style.height = '100vh'
      })()}

      <FilePicker
        multiple
        width={250}
        marginBottom={32}
        onChange={files => console.log(files)}
      />

      <FilePicker multiple width={350} height={24} marginBottom={32} />

      <FilePicker disabled width={250} marginBottom={32} />
    </Box>
  ))
  .add('ImagePicker', () => (
    <Box padding={40}>
      <ImagePicker
        width="100%"
        height={350}
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        maxWidth={1200}
        marginBottom={32}
      />
    </Box>
  ))
