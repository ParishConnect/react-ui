import { storiesOf } from '@storybook/react'
import React from 'react'
import Box from '@parishconnect/box'
import Component from '@reactions/component'
import { Radio, RadioGroup } from '../../radio'
import { Heading } from '../../typography'

storiesOf('radio', module)
  .add('RadioGroup', () => (
    <Box padding={40}>
      {(() => {
        document.body.style.margin = '0'
        document.body.style.height = '100vh'
      })()}
      <Component
        initialState={{
          options: [
            { label: 'Read-only', value: 'read-only' },
            { label: 'Write', value: 'write' },
            { label: 'Restricted', value: 'restricted' }
          ],
          value: 'restricted'
        }}
      >
        {({ state, setState }) => (
          <RadioGroup
            label="Permissions"
            value={state.value}
            options={state.options}
            onChange={value => setState({ value })}
          />
        )}
      </Component>
      <Component
        initialState={{
          options: [
            { label: 'Read-only', value: 'read-only' },
            { label: 'Write', value: 'write' },
            { label: 'Restricted', value: 'restricted' }
          ],
          value: 'restricted'
        }}
      >
        {({ state, setState }) => (
          <RadioGroup
            marginTop={40}
            size={16}
            label="Permissions"
            value={state.value}
            options={state.options}
            onChange={value => setState({ value })}
          />
        )}
      </Component>
    </Box>
  ))
  .add('Radio', () => (
    <Box padding={40}>
      {(() => {
        document.body.style.margin = '0'
        document.body.style.height = '100vh'
      })()}
      <Heading>Default usage, size 12</Heading>
      <Box aria-label="Radio Group Label 12" role="group">
        <Radio checked name="group" label="Radio default" />
        <Radio name="group" checked label="Radio checked" />
        <Radio name="group" disabled label="Radio disabled" />
        <Radio name="group" disabled label="Radio checked disabled" />
      </Box>
      <Heading marginTop={40}>Bigger usage, size 16</Heading>
      <Box aria-label="Radio Group Label 16" role="group">
        <Radio checked size={16} name="group2" label="Radio default" />
        <Radio size={16} name="group2" checked label="Radio checked" />
        <Radio size={16} name="group2" disabled label="Radio disabled" />
        <Radio
          size={16}
          name="group2"
          disabled
          label="Radio checked disabled"
        />
      </Box>
    </Box>
  ))
