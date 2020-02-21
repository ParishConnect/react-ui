import Box from '@parishconnect/box'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Heading, Upload } from '../src'

storiesOf('upload', module).add('Upload', () => (
  <Box padding={40}>
    <Heading size={700} marginBottom={24}>
      File Upload Handler
    </Heading>
    <Upload maxWidth={300} onUpload={console.log} />
  </Box>
))
