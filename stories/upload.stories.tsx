import Box from '@parishconnect/box'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { FeaturedImageUpload, Heading, Upload } from '../src'
import { createS3 } from './helpers/createS3Config'

const testServer = {}

storiesOf('upload', module)
  .add('Upload', () => (
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
  .add('Featured Image', () => (
    <Box padding={40}>
      <FeaturedImageUpload
        server={testServer}
        containerProps={{ width: 1200, height: 350, marginX: 'auto' }}
      />
    </Box>
  ))
