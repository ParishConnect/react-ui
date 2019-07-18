import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Pane, BaseEditor } from '../src'
import { majorScale } from '../src/scales'

storiesOf('editor', module)
  .add('Base Editor', () => (
    <Pane maxWidth={500} margin={majorScale(8)} position="relative">
      <BaseEditor placeholder="Base Editor..." autoFocus />
    </Pane>
  ))
  .add('Toolbar Editor', () => (
    <Pane maxWidth={500} margin={majorScale(8)} position="relative">
      {/* <ToolbarEditor placeholder="Toolbar Editor..." autoFocus /> */}
    </Pane>
  ))
