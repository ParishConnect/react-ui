import Box from '@hennessyevan/aluminum-box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import { startOfMinute } from 'date-fns'
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
      <Component initialState={{ date: startOfMinute(new Date()) }}>
        {({ state, setState }) => (
          <>
            {JSON.stringify(state.date)}
            <DateTimePicker
              name="dtstart"
              label="Date time Picker"
              value={state.date}
              position={Position.BOTTOM_LEFT as PositionEnum}
              onChange={date => setState({ date })}
              showArrowButtons
              useAmPm
            />
          </>
        )}
      </Component>
    </Box>
  ))
  .add('Inline Time Picker', () => (
    <Box padding={majorScale(6)}>
      <Component initialState={{ time: new Date(0, 0, 0, 11, 25) }}>
        {({ state, setState }) => (
          <>
            <TimePicker
              label="Pick a time"
              showArrowButtons
              useAmPm
              value={state.time}
              onChange={time => setState({ time })}
            />
            <pre>{JSON.stringify(startOfMinute(state.time))}</pre>
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
      <DatePicker />
    </Box>
  ))
