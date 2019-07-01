import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@parishconnect/box'
import { Textarea, Label, Text, Heading } from '../src'

const Description = props => (
  <Text is="p" marginTop={0} size={300} color="muted" {...props as any} />
)

storiesOf('textarea', module)
  .add('overview', () => (
    <Box padding={48}>
      <Box marginBottom={24} width={360}>
        <Label htmlFor={32} size={400} display="block">
          Default
        </Label>
        <Description marginBottom={8}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.
        </Description>
        <Textarea name={32} id={32} placeholder="With placeholder" />
      </Box>
      <Box marginBottom={24} width={360}>
        <Label htmlFor="disabled" size={400} display="block">
          Disabled
        </Label>
        <Textarea
          value="This is disabled"
          name="disabled"
          id="disabled"
          disabled
        />
      </Box>
      <Box marginBottom={24} width={360}>
        <Label htmlFor="isInvalid" size={400} display="block">
          Is Invalid
        </Label>
        <Textarea name="isInvalid" id="isInvalid" isInvalid />
      </Box>
    </Box>
  ))
  .add('autoresize', () => (
    <Box>
      <Heading>
        <Textarea
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
      </Heading>
    </Box>
  ))
