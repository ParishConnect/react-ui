import Box from '@parishconnect/box'
import Component from '@reactions/component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { SegmentedControl, Text } from '../src'

storiesOf('segmented-control', module).add('SegmentedControl', () => (
  <Box padding={40}>
    {(() => {
      document.body.style.margin = '0'
      document.body.style.height = '100vh'
    })()}
    <Component
      initialState={{
        options: [
          { label: 'Month', value: 'month' },
          { label: 'Week', value: 'week' },
          { label: 'Day', value: 'day' }
        ],
        value: 'month'
      }}
    >
      {({ state, setState }) => (
        <SegmentedControl
          name="time"
          width={280}
          height={36}
          options={state.options}
          value={state.value}
          onChange={value => {
            setState({ value })
            console.log(value)
          }}
        />
      )}
    </Component>
    <Component
      initialState={{
        options: [{ label: 'On', value: true }, { label: 'Off', value: false }],
        value: true
      }}
    >
      {({ state, setState }) => (
        <Box marginTop={24}>
          <Text>Controlled</Text>
          <SegmentedControl
            name="switch"
            marginTop={24}
            width={80}
            height={24}
            options={state.options}
            value={state.value}
            onChange={value => {
              setState({ value })
            }}
          />
          <SegmentedControl
            name="switch"
            marginTop={24}
            width={80}
            height={24}
            options={state.options}
            value={state.value}
            onChange={value => {
              setState({ value })
            }}
          />
        </Box>
      )}
    </Component>
    <Box marginTop={24}>
      <Text>Uncontrolled</Text>
      <SegmentedControl
        width={80}
        height={24}
        options={[{ label: 'On', value: true }, { label: 'Off', value: false }]}
        defaultValue={false}
      />
    </Box>
  </Box>
))
