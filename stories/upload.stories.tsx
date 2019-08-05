import Box from '@parishconnect/box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  Dialog,
  FeaturedImageUpload,
  Heading,
  IconButton,
  Image,
  PlusIcon,
  Upload
} from '../src'
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
            onCloseComplete={() => setState({ open: false })}
            isShown={state.open}
            title="Choose an image"
            hasFooter={false}
          >
            <Box
              display="grid"
              justifyContent="start"
              gridTemplateColumns="repeat(auto-fit, 150px)"
              gap={8}
            >
              {['10', '11', '12', '13'].map(id => (
                <Image
                  key={id}
                  borderRadius={4}
                  cursor="pointer"
                  src={`https://picsum.photos/id/${id}/300/300`}
                  height={150}
                  width={150}
                  onClick={() => {
                    state.filepond &&
                      state.filepond.addFile(
                        `https://picsum.photos/id/${id}/2400/700`,
                        { type: 'local' }
                      )
                    setState({ open: false })
                  }}
                />
              ))}
              <IconButton
                onClick={state.filepond && state.filepond.browse}
                borderRadius={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                height={150}
                width={150}
                icon={PlusIcon}
                iconSize={80}
              />
            </Box>
          </Dialog>
          <FeaturedImageUpload
            instantUpload
            onaddfile={err => {
              if (err) return
              setState({ open: false })
            }}
            onClick={ref => setState({ open: true, filepond: ref })}
            allowBrowse={state.open}
            server={testServer}
            containerProps={{ width: 1200, height: 350, marginX: 'auto' }}
          />
        </Box>
      )}
    </Component>
  ))
