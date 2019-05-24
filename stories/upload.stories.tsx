import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@parishconnect/box'
import { Upload, Heading } from '../src'
import { createS3 } from './helpers/createS3Config'

storiesOf('upload', module).add('Upload', () => (
  <Box padding={40}>
    <Heading size={700} marginBottom={24}>
      File Upload Handler
    </Heading>
    <Upload
      maxWidth={300}
      server={createS3()}
      files={[
        {
          source: 'sample.jpg',
          options: {
            type: 'local'
          }
        }
      ]}
    />
  </Box>
))
