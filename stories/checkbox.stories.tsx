import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { Checkbox } from '../src'

storiesOf('checkbox', module).add('Checkbox', () => (
  <Box padding={40}>
    <Checkbox label="Checkbox default" />
    <Checkbox checked label="Checkbox checked" />
    <Checkbox disabled label="Checkbox disabled" />
    <Checkbox disabled checked label="Checkbox checked disabled" />
    <Checkbox indeterminate label="Checkbox indeterminate" />
    <Checkbox checked indeterminate label="Checkbox checked indeterminate" />
  </Box>
))