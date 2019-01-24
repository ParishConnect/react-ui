import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Editor, Card } from '../src'

storiesOf('editor', module).add('Editor Core', () => (
  <Card elevation={3} maxWidth={1200} margin={40}>
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
      containerProps={{ backgroundColor: 'red' }}
      backgroundColor="red"
    />
  </Card>
))
