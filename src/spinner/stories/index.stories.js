import { storiesOf } from '@storybook/react'
import React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { Spinner } from '../../spinner'

storiesOf('spinner', module).add('Spinner', () => (
  <Box padding={40}>
    {(() => {
      document.body.style.margin = '0'
      document.body.style.height = '100vh'
    })()}
    <Spinner>Spinner</Spinner>
  </Box>
))
