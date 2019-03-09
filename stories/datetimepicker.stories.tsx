import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import {
  InlineDatePicker,
  DatePicker,
  TimePicker,
  TimeInput
} from '../src/datetime-picker'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { majorScale } from '../src/scales'

storiesOf('datetime-picker', module)
  .add('Inline Date Picker', () => (
    <Box padding={majorScale(6)}>
      <Component initialState={{}}>
        {({ state, setState }) => (
          <>
            <InlineDatePicker
              value={state.date}
              onChange={date => setState({ date })}
            />
            {JSON.stringify(state.date)}
          </>
        )}
      </Component>
    </Box>
  ))
  .add('Date Picker', () => (
    <Box padding={majorScale(6)}>
      <DatePicker mobile />
    </Box>
  ))
  .add('Time Picker', () => (
    <Box padding={majorScale(6)}>
      <TimePicker onChange={console.log} />
    </Box>
  ))
  .add('Time Input', () => (
    <Box padding={majorScale(6)}>
      <TimeInput label="Time Picker" value="15:45" onChange={console.log} />
    </Box>
  ))
