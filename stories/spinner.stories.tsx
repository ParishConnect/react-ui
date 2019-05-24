import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@parishconnect/box'
import { Spinner, Text, Pane } from '../src'

const spinners = [
  {
    title: 'Custom Color - in theme (Red)',
    color: 'red'
  },
  {
    title: 'Custom Color - out of theme (#00FF00)',
    color: '#00FF00'
  },
  {
    title: 'Theme Color',
    color: 'theme'
  },
  {
    title: 'Default Color',
    color: 'default'
  }
]

storiesOf('spinner', module).add('Spinner', () => (
  <Box padding={40}>
    <Box display="flex" flexDirection="column">
      {spinners.map(spinner => (
        <Box padding={16} key={spinner.color + spinner.title}>
          <Text>{spinner.title}</Text>
          <Spinner color={spinner.color}>Spinner</Spinner>
        </Box>
      ))}
      <Pane elevation={4} maxWidth={400} padding={16} background="blue">
        <Text>Adaptive</Text>
        <Spinner adaptive baseColor="blue">
          Spinner
        </Spinner>
      </Pane>
    </Box>
  </Box>
))
