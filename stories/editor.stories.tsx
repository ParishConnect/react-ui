import Box from '@hennessyevan/aluminum-box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  Button,
  Card,
  Editor,
  Heading,
  ImagePicker,
  Pane,
  Renderer,
  Textarea,
  Edit2Icon,
  IconButton,
  CheckIcon,
  XIcon
} from '../src'
import { majorScale } from '../src/scales'
import testDocument from './testDocument.json'

const content = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'sdfgsdfsdfgsdfgsdfgsdfgsdfgslkjdkfjg;lsjdf;lk',
          marks: []
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: { href: 'mailto:support@parishconnect.ca' }
            }
          ],
          text: 'support@parishconnect.ca'
        },
        {
          type: 'image',
          attrs: {
            src:
              'https://res.cloudinary.com/parishconnect/image/upload/v1555431640/posts/palm_sunday.jpg',
            width: '50%',
            layout: 'center'
          }
        }
      ]
    }
  ]
}

const inlineContent = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          marks: []
        }
      ]
    }
  ]
}

storiesOf('editor', module)
  .add('Post Editor', () => (
    <Card
      marginTop={32}
      marginX="auto"
      width="100%"
      maxWidth={1000}
      css={{
        '.remirror-editor': {
          maxWidth: 800
        }
      }}
    >
      <ImagePicker borderRadius={8} marginBottom={majorScale(4)} />
      <Editor
        allowImages={false}
        autoFocus={false}
        toolbarProps={{
          position: 'sticky',
          top: 0
        }}
        toolbarComponents={({ state }) => (
          <Button
            appearance="primary"
            onClick={() => console.log(JSON.stringify(state.doc.textContent))}
          >
            Save
          </Button>
        )}
        contentComponents={
          <Box maxWidth={800} marginTop={majorScale(8)} marginX="auto">
            <Textarea
              autoFocus
              appearance="editor-title"
              component={Heading}
              size={800}
              maxLength="120"
              maxWidth={624}
              rows={1}
              overflow="hidden"
              autoresize
              placeholder="Add a title..."
            />
          </Box>
        }
        initialContent={testDocument}
        width={1000}
        appearance="primary"
        placeholder="Start writing..."
      />
    </Card>
  ))
  .add('Default Editor', () => (
    <Box margin={majorScale(8)}>
      <Heading marginTop={majorScale(8)}>Collapsed</Heading>
      <Component initialState={{ isCollapsed: true }}>
        {({ state, setState }) => (
          <Pane maxWidth={500} position="relative">
            <Editor
              containerProps={{ border: true }}
              collapsed={state.isCollapsed}
              onExpand={() => setState({ isCollapsed: false })}
              allowImages={false}
              extraStyles={{ maxWidth: 450 }}
              placeholder="This is the default appearance..."
            />
          </Pane>
        )}
      </Component>
      <Heading marginTop={majorScale(8)}>Default</Heading>
      <Pane maxWidth={500} position="relative">
        <Editor
          containerProps={{ border: true }}
          allowImages={false}
          extraStyles={{ maxWidth: 450 }}
          placeholder="This is the default appearance..."
        />
      </Pane>
    </Box>
  ))
  .add('Minimal Editor', () => (
    <Pane maxWidth={500} margin={majorScale(8)} position="relative">
      <Editor
        appearance="minimal"
        allowImages={false}
        extraStyles={{ maxWidth: 450 }}
        placeholder="This is the default appearance..."
      />
    </Pane>
  ))
  .add('Renderer', () => (
    <Pane maxWidth={1000} margin={majorScale(8)} position="relative">
      <Box maxWidth={800} marginTop={majorScale(8)} marginX="auto">
        <Heading maxWidth={624} size={800}>
          Title
        </Heading>
      </Box>
      <Renderer json={testDocument} width={1000} />
    </Pane>
  ))
  .add('Inline Editor', () => (
    <Component initialState={{ editing: false }}>
      {({ state, setState }) => (
        <Pane maxWidth={500} margin={majorScale(8)} position="relative">
          {state.editing ? (
            <Box>
              <Editor
                paddingY={8}
                paddingX={16}
                border
                initialContent={inlineContent}
                appearance="minimal"
                allowImages={false}
                placeholder="This is the default appearance..."
              />
              <Card display="flex" float="right">
                <Button
                  iconBefore={XIcon}
                  intent="danger"
                  marginRight={8}
                  onClick={() => setState({ editing: false })}
                >
                  Cancel
                </Button>
                <Button
                  iconBefore={CheckIcon}
                  intent="success"
                  appearance="primary"
                >
                  Save
                </Button>
              </Card>
            </Box>
          ) : (
            <Box>
              <Renderer paddingY={8} paddingX={16} json={inlineContent} />
              <Box float="right">
                <Button
                  iconBefore={Edit2Icon}
                  onClick={() => setState({ editing: true })}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          )}
        </Pane>
      )}
    </Component>
  ))
