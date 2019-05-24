import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Component from '@reactions/component'
import Box from '@parishconnect/box'
import starWarsNames from 'starwars-names'
import { Combobox, Heading } from '../src'

// Generate a big list of items
const items = starWarsNames.all.sort((a, b) => {
  const nameA = a.toUpperCase()
  const nameB = b.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  return 0
})

const customItems = items.map(i => ({ label: i }))
const seasons = ['Easter', 'Christmas', 'Pentecost']

const objectItems = seasons.map(i => ({ key: i, value: i }))

const handleChange = selectedItem => {
  console.log(selectedItem)
}

storiesOf('combobox', module).add('Combobox', () => (
  <Box padding={40}>
    {(() => {
      document.body.style.margin = '0'
      document.body.style.height = '100vh'
    })()}
    <Box marginBottom={16}>
      <Heading>Default usage</Heading>
      <Combobox items={items} onChange={handleChange} />
    </Box>
    <Box marginBottom={16}>
      <Heading>Custom width</Heading>
      <Combobox width={120} items={items} onChange={handleChange} />
    </Box>
    <Box marginBottom={16} marginLeft={400}>
      <Heading>Custom width + offset</Heading>
      <Combobox width={120} items={items} onChange={handleChange} />
    </Box>
    <Box marginBottom={16}>
      <Heading>Open on focus</Heading>
      <Combobox openOnFocus items={items} onChange={handleChange} />
    </Box>
    <Box marginBottom={16}>
      <Heading>Default value</Heading>
      <Combobox
        defaultSelectedItem="Yoda"
        items={items}
        onChange={handleChange}
      />
    </Box>
    <Box marginBottom={16}>
      <Heading>Custom item objects</Heading>
      <Combobox
        defaultSelectedItem={customItems[0]}
        items={customItems}
        itemToString={i => (i ? i.label : '')}
        onChange={handleChange}
      />
    </Box>
    <Box marginBottom={16}>
      <Heading>Creatable</Heading>
      <Component initialState={{ objectItems }}>
        {({ state, setState }) => (
          <Combobox
            createable
            openOnFocus
            onItemCreated={item =>
              setState({ objectItems: [item].concat(objectItems) })
            }
            items={state.objectItems}
            itemToString={i => (i ? i.value : '')}
            selectedItem={state.selectedItem && state.selectedItem}
            onChange={selectedItem => setState({ selectedItem })}
          />
        )}
      </Component>
    </Box>
  </Box>
))
