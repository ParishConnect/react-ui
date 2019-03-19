import Box from '@hennessyevan/aluminum-box'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  Button,
  Card,
  Code,
  Editor,
  EditorContext,
  Heading,
  ImagePicker,
  JSONTransformer,
  PlainTransformer,
  ReactRenderer,
  Small,
  SmartCardProvider,
  Strong,
  Text,
  Textarea,
  toaster,
  WithEditorActions
} from '../src'
import { Manager } from '../src/manager'
import { BibleCardClient, BibleCardProvider } from './bibleProvider'
import testDocument from './testDocument.json'

const bibleClient = new BibleCardClient()
const bibleCardProvider = new BibleCardProvider()

const InfoNode = ({ user }) => {
  return (
    <Box marginBottom={25}>
      <Strong textTransform="uppercase" color="black">{`${user.firstName} ${
        user.lastName
      }`}</Strong>
    </Box>
  )
}

const SaveAndCancelButtons = props => (
  <Box display="grid" gridAutoFlow="column" alignItems="center" gridGap={16}>
    <Text>
      <Small whiteSpace="nowrap">Last Saved 2 minutes ago</Small>
    </Text>
    <Button
      appearance="primary"
      onClick={() => {
        setTimeout(() => {
          toaster.success('Published')
        }, 1000)
      }}
    >
      Publish
    </Button>
  </Box>
)

storiesOf('editor', module)
  .add('Editor Core', () => (
    <Card elevation={3} maxWidth={1200} margin={40}>
      <ImagePicker />
      <EditorContext>
        <SmartCardProvider client={bibleClient}>
          <Editor
            disabled={false}
            appearance="full-page"
            UNSAFE_cards={{
              provider: Promise.resolve(bibleCardProvider)
            }}
            allowIndentation
            onChange={console.log}
            placeholder="Write something..."
            containerProps={{ paddingX: 48 }}
            primaryToolbarComponents={
              <WithEditorActions
                render={actions => (
                  <SaveAndCancelButtons editorActions={actions} />
                )}
              />
            }
            textFormatting={{
              disableCode: true,
              disableSuperscriptAndSubscript: true,
              disableSmartTextCompletion: true
            }}
            contentComponents={
              <WithEditorActions
                render={actions => (
                  <>
                    <Textarea
                      appearance="editor-title"
                      component={Heading}
                      autoFocus
                      size={900}
                      autoresize
                      marginBottom={16}
                      maxLength="120"
                      maxWidth={624}
                      placeholder="Give this page a title..."
                    />
                    <InfoNode
                      user={{ firstName: 'Evan', lastName: 'Hennessy' }}
                    />
                  </>
                )}
              />
            }
          />
        </SmartCardProvider>
      </EditorContext>
    </Card>
  ))
  .add('JSON Transformer', () => (
    <Card elevation={3} maxWidth={1200} margin={40}>
      <Manager>
        {({ setState, state }) => (
          <Editor
            appearance="full-page"
            placeholder="Write something..."
            onChange={editorView => {
              const transformer = new JSONTransformer()
              const output = JSON.stringify(
                transformer.encode(editorView.state.doc),
                null,
                2
              )
              setState({ output })
            }}
            contentComponents={
              <WithEditorActions
                render={() => (
                  <div style={{ maxWidth: 300 }}>
                    {JSON.stringify(state, null, 2)}
                  </div>
                )}
              />
            }
          />
        )}
      </Manager>
    </Card>
  ))
  .add('Plain Transformer', () => (
    <Card elevation={3} maxWidth={1200} margin={40}>
      <Manager>
        {({ setState, state }: any) => (
          <Editor
            appearance="full-page"
            placeholder="Write something..."
            onChange={editorView => {
              const transformer = new PlainTransformer()
              const output = JSON.stringify(
                transformer.encode(editorView.state.doc),
                null,
                2
              )
              setState(output)
            }}
            contentComponents={
              <WithEditorActions
                render={() => (
                  <Card marginBottom={16} maxWidth={320} minHeight={16}>
                    <Heading>Plain Text:</Heading>
                    <Code>{state[0]}</Code>
                  </Card>
                )}
              />
            }
          />
        )}
      </Manager>
    </Card>
  ))
  .add('Renderer', () => (
    <Card elevation={3} maxWidth={1200} margin={40} padding={40}>
      <ReactRenderer document={testDocument} />
    </Card>
  ))
