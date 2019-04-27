import Box from '@hennessyevan/aluminum-box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import { isBefore, isSameDay, startOfDay, startOfMinute } from 'date-fns'
import { DateTime } from 'luxon'
import * as React from 'react'
import { RRule } from 'rrule'
import { Button } from '../src/buttons'
import { Position, PositionEnum } from '../src/constants'
import {
  DatePicker,
  DateTimePicker,
  InlineDatePicker,
  RecurrencePicker,
  TimePicker
} from '../src/datetime-picker'
import { SaveIcon } from '../src/icons'
import { Card } from '../src/layers'
import { majorScale } from '../src/scales'
import { Heading, Text } from '../src/typography'
import { Table } from '../src/table'
import { Dialog } from '../src/dialog'
import { toaster } from '../src/toaster'

const rule = new RRule({
  freq: RRule.MONTHLY,
  byweekday: RRule.FR,
  interval: 1,
  bysetpos: [1, 3, 5],
  dtstart: new Date()
})

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
              hint="hint"
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
      <Component initialState={{ date: new Date(2019, 5, 14) }}>
        {({ state, setState }) => (
          <>
            <DatePicker
              label="DatePicker Label"
              hint="DatePicker Hint"
              value={state.date}
              onChange={date => setState({ date })}
            />
            {JSON.stringify(state.date)}
          </>
        )}
      </Component>
    </Box>
  ))
  .add('Recurrence Editor Template', () => (
    <Component initialState={{ isShown: true }}>
      {({ state, setState }) =>
        state.isShown ? (
          <Card border width={1000}>
            <RecurrencePicker
              height={600}
              disableDates={date => isBefore(date, startOfDay(new Date()))}
              recurrenceRule={rule}
              yearsToCompute={1}
              value={rule.after(new Date(), true)}
              onClose={() => setState({ isShown: false })}
              noResults={<Text>Click a date to see options</Text>}
              dateComponents={(selectedDate, deselect, close) => (
                <Box>
                  <Text display="block">Render your date options here.</Text>
                  <Heading marginTop={12}>Current Date</Heading>
                  <Text>
                    The active date is{' '}
                    {DateTime.fromJSDate(selectedDate).toLocaleString(
                      DateTime.DATE_FULL
                    )}
                  </Text>
                  <Heading marginTop={12}>Actions</Heading>
                  <Button marginRight={majorScale(1)} onClick={deselect}>
                    Deselect
                  </Button>
                  <Button onClick={close}>Close</Button>
                  <Heading marginTop={12}>The recurring rule is</Heading>
                  <Text>{rule.toText()}</Text>
                </Box>
              )}
            />
          </Card>
        ) : (
          <Button onClick={() => setState({ isShown: true })}>Show</Button>
        )
      }
    </Component>
  ))
  .add('Recurrence Editor Full', () => (
    <Component
      initialState={{
        isShown: true,
        exceptedDates: [],
        currTime: null,
        newTime: null
      }}
    >
      {({ state, setState }) => (
        <Box padding={majorScale(4)}>
          <Dialog
            contentContainerProps={{
              padding: 0,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8
            }}
            hasHeader={false}
            hasFooter={false}
            isShown={state.isShown}
            width={800}
          >
            <RecurrencePicker
              title="Full Recurrence Editor Example"
              height={600}
              disableDates={date => isBefore(date, new Date())}
              recurrenceRule={rule}
              onChange={() => setState({ newTime: null, currTime: null })}
              yearsToCompute={1}
              value={rule.after(new Date(), true)}
              onClose={() => {
                if (!state.exceptedDates.length) {
                  return setState({ isShown: false })
                } else {
                  toaster.warning('Unsaved Changes', {
                    id: 'unsaved-recurrences',
                    description:
                      'You have unsaved changes. If you close your changes will be lost.'
                  })
                }
              }}
              noResults={<Text>Click a date to see options</Text>}
              dateComponents={selectedDate => {
                if (!state.currTime) {
                  const currTime = state.exceptedDates.filter((d: Date) =>
                    isSameDay(d, selectedDate)
                  )
                  if (currTime[0]) {
                    setState({ currTime: currTime[0] })
                  } else {
                    setState({
                      currTime: DateTime.fromJSDate(selectedDate)
                        .set({ hour: 9, minute: 30 })
                        .startOf('minute')
                        .toJSDate()
                    })
                  }
                }

                return (
                  <Box height={550} padding={majorScale(4)} overflowY="auto">
                    <Text>
                      The active date is{' '}
                      {DateTime.fromJSDate(selectedDate)
                        .set({ hour: 9, minute: 30 })
                        .startOf('minute')
                        .toLocaleString(DateTime.DATETIME_FULL)}
                    </Text>
                    <Box marginTop={12} display="flex" alignItems="center">
                      <TimePicker
                        label="Change time"
                        useAmPm
                        showArrowButtons
                        value={state.newTime || state.currTime}
                        onChange={newTime =>
                          newTime !== state.currTime && setState({ newTime })
                        }
                      />
                      {state.newTime && (
                        <Button
                          onClick={() => {
                            let foundIndex: number
                            // Check if exceptedDates contains an entry with the same date
                            const sameDayInArray = state.exceptedDates.some(
                              (d: Date, i: number) => {
                                if (isSameDay(d, state.newTime)) {
                                  foundIndex = i
                                  return true
                                }
                                return false
                              }
                            )

                            // Is there is no entry with this date in it, just add it
                            if (!sameDayInArray) {
                              setState({
                                exceptedDates: [state.newTime].concat(
                                  state.exceptedDates
                                )
                              })
                            } else {
                              // If the matching day we found in the array is not
                              //the same time as the newTime, replace the newTime with the old
                              if (
                                state.exceptedDates[foundIndex] !==
                                state.newTime
                              ) {
                                setState({
                                  exceptedDates: state.exceptedDates.map(
                                    (d: Date) =>
                                      isSameDay(d, state.newTime)
                                        ? state.newTime
                                        : d
                                  )
                                })
                              }
                            }
                          }}
                          marginLeft={majorScale(1)}
                          appearance="primary"
                          iconBefore={SaveIcon}
                        >
                          Save
                        </Button>
                      )}
                    </Box>
                    <Table border width={400} marginTop={24}>
                      <Table.Head>
                        <Table.TextHeaderCell>Date</Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                          Changed Time
                        </Table.TextHeaderCell>
                      </Table.Head>
                      <Table.Body>
                        {state.exceptedDates.map(date => (
                          <Table.Row key={date}>
                            <Table.TextCell>
                              {DateTime.fromJSDate(date).toLocaleString(
                                DateTime.DATE_FULL
                              )}
                            </Table.TextCell>
                            <Table.TextCell>
                              {DateTime.fromJSDate(date).toLocaleString(
                                DateTime.TIME_SIMPLE
                              )}
                            </Table.TextCell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Box>
                )
              }}
            />
          </Dialog>
          <Button onClick={() => setState({ isShown: true })}>Show</Button>
        </Box>
      )}
    </Component>
  ))
