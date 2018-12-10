import { storiesOf } from '@storybook/react'
import React from 'react'
import { Card } from '../../layers'
import { Editor } from '../../editor'

storiesOf('editor', module)
  .add('Editor', () => (
    <Card maxWidth={1000} margin={15} elevation={1} height="90vh">
      <Editor offset={5} />
    </Card>
  ))
  .add('Editor with Title', () => (
    <Card maxWidth={1000} margin={15} elevation={1} height="90vh">
      <Editor hasTitle offset={5} provideHTML />
    </Card>
  ))
