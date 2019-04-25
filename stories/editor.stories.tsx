import Box from '@hennessyevan/aluminum-box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Editor, Heading, Textarea, Pane, Renderer } from '../src'
import { majorScale } from '../src/scales'
import { EMPTY_OBJECT_NODE } from '@remirror/core'

const content = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'sdfgsdfsdfgsdfgsdfgsdfgsdfgslkjdkfjg;lsjdf;lk',
          marks: []
        },
        {
          type: 'image',
          attrs: {
            src:
              'https://res.cloudinary.com/parishconnect/image/upload/v1555431640/posts/palm_sunday.jpg',
            width: '50%',
            layout: 'center'
          }
        }
      ]
    }
  ]
}

storiesOf('editor', module)
  .add('Post Editor', () => (
    <Component initialState={{ value: '' }}>
      {({ state, setState }) => (
        <Pane maxWidth={1000} border margin={majorScale(8)} position="relative">
          <Editor
            autoFocus={false}
            contentComponents={
              <Box maxWidth={800} marginTop={majorScale(8)} marginX="auto">
                <Textarea
                  autoFocus
                  appearance="editor-title"
                  component={Heading}
                  size={800}
                  maxLength="120"
                  maxWidth={624}
                  rows={1}
                  overflow="hidden"
                  autoresize
                  placeholder="Add a title..."
                />
              </Box>
            }
            initialContent={content}
            width={1000}
            appearance="primary"
            placeholder="Start writing..."
          />
        </Pane>
      )}
    </Component>
  ))
  .add('Renderer', () => (
    <Pane maxWidth={1000} border margin={majorScale(8)} position="relative">
      <Box maxWidth={800} marginTop={majorScale(8)} marginX="auto">
        <Heading maxWidth={624} size={800}>
          Title
        </Heading>
      </Box>
      <Renderer json={content} width={1000} />
    </Pane>
  ))
