import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'react-emotion'
import Box from '@hennessyevan/aluminum-box'
import testDocument from './testDocument.json'
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
  Text
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
  .add('Renderer', () => (
    <Card elevation={3} maxWidth={1200} margin={40} padding={40}>
      <ReactRenderer document={testDocument} />
    </Card>
  ))
