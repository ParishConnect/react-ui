import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'react-emotion'
import Box from '@hennessyevan/aluminum-box'
import testDocument from './testDocument.json'
import { Manager } from '../src/manager'
import {
  Editor,
  WithEditorActions,
  Card,
  Strong,
  Button,
  toaster,
  ReactRenderer,
  ImagePicker,
  Small,
  Text,
  JSONTransformer,
  Code,
  Heading,
  PlainTransformer
} from '../src'

const TitleInput = styled('input')`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: #ccc;
  }
`

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
      <Editor
        disabled={false}
        appearance="full-page"
        allowTextAlignment
        allowIndentation
        shouldFocus
        placeholder="Write something..."
        toolbarProps={{ paddingX: 32 }}
        containerProps={{ paddingX: 48 }}
        primaryToolbarComponents={
          <WithEditorActions
            render={actions => <SaveAndCancelButtons editorActions={actions} />}
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
                <TitleInput placeholder="Give this page a title..." />
                <InfoNode user={{ firstName: 'Evan', lastName: 'Hennessy' }} />
              </>
            )}
          />
        }
      />
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
