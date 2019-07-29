import Box from '@parishconnect/box'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Editor, majorScale, Renderer } from '../src'
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
    <Box margin={majorScale(3)}>
      <Renderer json={testDocument}></Renderer>
    </Box>
  ))
