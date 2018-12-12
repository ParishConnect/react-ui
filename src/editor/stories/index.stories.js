import { storiesOf } from '@storybook/react'
import React from 'react'
import { Card } from '../../layers'
import { Dialog } from '../../dialog'
import { Editor } from '../../editor'

storiesOf('editor', module)
  .add('Editor', () => (
    <Card maxWidth={1000} margin={15} elevation={1} height="90vh">
      <Editor offset={5} />
    </Card>
  ))
  .add('Editor with Title', () => (
    <Dialog
      isShown
      hasHeader={false}
      intent="success"
      confirmLabel="Save"
      minHeightContent="95%"
      externalScrolling
      containerProps={{
        width: 'calc(100% - 2rem)',
        height: '90vh',
        maxWidth: 1000,
        padding: 25
      }}
    >
      <Editor
        hasTitle
        editorInDialog
        provideHTML
        providePlain
        onValueChange={({ html, plain }) => console.log({ html, plain })}
        offset={5}
      />
    </Dialog>
  ))
