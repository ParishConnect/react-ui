import Box from '@parishconnect/box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Dialog, FeaturedImageUpload, Heading, Image, Upload } from '../src'
import { createS3 } from './helpers/createS3Config'

const testServer = {
  load: (url, load, error, progress, abort, headers) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => load(blob))
  }
}

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
    <Component initialState={{ open: false }}>
      {({ state, setState }) => (
        <Box padding={40}>
          <Dialog
            isShown={state.open}
            title="Choose an image"
            hasFooter={false}
          >
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={8}>
              <Image
                cursor="pointer"
                src="https://picsum.photos/id/10/300/300"
                height={150}
                width={150}
                onClick={() => {
                  state.filepond &&
                    state.filepond.addFile(
                      'https://picsum.photos/id/10/2400/700',
                      { type: 'local' }
                    )
                  setState({ open: false })
                }}
              />
              <Image
                cursor="pointer"
                src="https://picsum.photos/id/11/300/300"
                height={150}
                width={150}
                onClick={() => {
                  state.filepond &&
                    state.filepond.addFile(
                      'https://picsum.photos/id/11/2400/700',
                      { type: 'local' }
                    )
                  setState({ open: false })
                }}
              />
            </Box>
          </Dialog>
          <FeaturedImageUpload
            onClick={filepond => setState({ open: true, filepond })}
            server={testServer}
            containerProps={{ width: 1200, height: 350, marginX: 'auto' }}
          />
        </Box>
      )}
    </Component>
  ))
