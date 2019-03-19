import Box from '@hennessyevan/aluminum-box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Position, PositionEnum } from '../src/constants'
import {
  DatePicker,
  DateTimePicker,
  InlineDatePicker,
  TimePicker
} from '../src/datetime-picker'
import { majorScale } from '../src/scales'

storiesOf('datetime-picker', module)
  .add('Date-Time Picker', () => (
    <Box padding={majorScale(6)}>
      <Component initialState={{}}>
        {({ state, setState }) => (
          <>
            {JSON.stringify(state.date)}
            <DateTimePicker
              label="Date time Picker"
              position={Position.BOTTOM_LEFT as PositionEnum}
              onChange={date => setState({ date })}
            />
          </>
        )}
      </Component>
    </Box>
  ))

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
      <TimePicker value="13:00" onChange={console.log} />
    </Box>
  ))
