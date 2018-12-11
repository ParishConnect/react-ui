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
      containerProps={{
        width: 'calc(100% - 2rem)',
        height: '90vh',
        maxWidth: 1000,
        padding: 25
      }}
    >
      <Editor hasTitle offset={5} />
    </Dialog>
  ))
