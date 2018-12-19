import { storiesOf } from '@storybook/react'
import React from 'react'
import { Card } from '../../layers'
import { Dialog } from '../../dialog'
import { Editor } from '../../editor'
import { ImagePicker } from '../../file-picker'

storiesOf('editor', module)
  .add('Editor', () => (
    <Card maxWidth={1000} margin={15} elevation={1} height="90vh">
      <Editor
        readOnly
        hasTitle
        title="Some title"
        offset={5}
        providePlain
        provideHTML
        titlePlaceholder="Enter a page title..."
        onValueChange={({ value }) =>
          console.log(JSON.stringify(value.toJSON()))
        }
      />
    </Card>
  ))
  .add('Editor with Title and ImagePicker', () => (
    <Dialog
      isShown
      hasHeader={false}
      intent="success"
      confirmLabel="Save"
      minHeightContent="95%"
      externalScrolling
      containerProps={{
        width: 'calc(100% - 2rem)',
        maxWidth: 1000,
        padding: 25
      }}
    >
      <ImagePicker
        height={350}
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
      />
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
