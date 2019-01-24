import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { Editor } from '../src'

storiesOf('editor', module).add('Editor Core', () => (
  <Box padding={40}>
    <Editor
      disabled={false}
      appearance="full-page"
      allowTextAlignment
      allowIndentation
      shouldFocus
      placeholder="Write something..."
      textFormatting={{
        disableCode: true,
        disableSuperscriptAndSubscript: true,
        disableSmartTextCompletion: true
      }}
    />
  </Box>
))
