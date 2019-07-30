import Box from '@parishconnect/box'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Editor, Heading, majorScale, Renderer } from '../src'
import testDocument from './testDocument.json'

storiesOf('editor', module)
  .add('Editor', () => (
    <Box margin={majorScale(3)}>
      <Editor
        maxWidth={600}
        showFloatingMenu
        css={{ marginLeft: majorScale(2) }}
      />
    </Box>
  ))
  .add('Renderer', () => (
    <Box
      margin={majorScale(3)}
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gap={32}
    >
      <Box>
        <Heading size={600} marginY={16}>
          Document from json
        </Heading>
        <Renderer
          height={300}
          overflowY="auto"
          border
          padding={32}
          document={testDocument}
        />
      </Box>
      <Box>
        <Heading size={600} marginY={16}>
          Document from string
        </Heading>
        <Renderer
          height={300}
          overflowY="auto"
          border
          padding={32}
          document="Some string"
        />
      </Box>
    </Box>
  ))
