import { storiesOf } from '@storybook/react'
import React from 'react'
import { Card } from '../../layers'
import { Editor } from '../../editor'

storiesOf('editor', module)
  .add('Editor', () => (
    <Card padding={50} margin={15} elevation={1} height="90vh">
      <Editor offset={5} />
    </Card>
  ))
  .add('Editor with Title', () => (
    <Card padding={50} margin={15} elevation={1} height="90vh">
      <Editor
        hasTitle
        offset={5}
        onTitleChange={({ value }) => {
          console.log(value)
        }}
        onValueChange={({ value }) => {
          console.log(value)
        }}
      />
    </Card>
  ))
