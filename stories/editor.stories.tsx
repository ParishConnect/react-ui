import Box from '@parishconnect/box'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Editor, majorScale } from '../src'

storiesOf('editor', module).add('Editor', () => (
  <Box margin={majorScale(3)}>
    <Editor
      maxWidth={600}
      showFloatingMenu
      css={{ marginLeft: majorScale(2) }}
    />
  </Box>
))
