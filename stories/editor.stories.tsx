import { storiesOf } from '@storybook/react'
import React from 'react'
import { Editor } from '../src'

storiesOf('editor', module).add('Editor', () => (
  <Editor placeholder="Full Editor..." appearance="primary" border />
))
