import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { TimeZone } from '../src'

storiesOf('timezone', module).add('TimeZone', () => (
  <Box>
    <TimeZone />
  </Box>
))
