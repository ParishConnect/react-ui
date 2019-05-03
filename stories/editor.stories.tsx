import Box from '@hennessyevan/aluminum-box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  Editor,
  Heading,
  Textarea,
  Pane,
  Renderer,
  ImagePicker,
  Button
} from '../src'
import { majorScale } from '../src/scales'
import testDocument from './testDocument.json'
import { InjectedRemirrorProps, useRemirrorContext } from '@remirror/react'
import { EditorState } from '@remirror/core'

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
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: { href: 'mailto:support@parishconnect.ca' }
            }
          ],
          text: 'support@parishconnect.ca'
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
    <Pane
      maxWidth={1000}
      margin={majorScale(8)}
      marginX="auto"
      position="relative"
    >
      <ImagePicker borderRadius={8} marginBottom={majorScale(4)} />
      <Editor
        allowImages={false}
        autoFocus={false}
        toolbarProps={{
          position: 'sticky',
          top: 0
        }}
        toolbarComponents={({ state }) => (
          <Button
            appearance="primary"
            onClick={() => console.log(JSON.stringify(state.doc.textContent))}
          >
            Save
          </Button>
        )}
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
        initialContent={testDocument}
        width={1000}
        appearance="primary"
        placeholder="Start writing..."
      />
    </Pane>
  ))
  .add('Renderer', () => (
    <Pane maxWidth={1000} margin={majorScale(8)} position="relative">
      <Box maxWidth={800} marginTop={majorScale(8)} marginX="auto">
        <Heading maxWidth={624} size={800}>
          Title
        </Heading>
      </Box>
      <Renderer json={testDocument} width={1000} />
    </Pane>
  ))
