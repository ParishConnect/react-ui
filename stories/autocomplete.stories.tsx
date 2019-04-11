import { storiesOf } from '@storybook/react'
import { concat } from 'lodash'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import starWarsNames from 'starwars-names'
import {
  Autocomplete,
  TextInput,
  Button,
  Heading,
  Text,
  Code,
  selectItem
} from '../src/'
import Component from '@reactions/component'

// Generate a big list of items
const items = [
  ...starWarsNames.all,
  ...starWarsNames.all.map(x => `${x} 2`),
  ...starWarsNames.all.map(x => `${x} 3`)
].sort((a, b) => {
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

const seasons = ['Easter', 'Christmas', 'Pentecost']

const objectItems = seasons.map(i => ({ key: i, value: i }))

const handleChange = selectedItem => {
  console.log(selectedItem)
}

storiesOf('autocomplete', module)
  .add('Autocomplete', () => (
    <Box>
      <Box padding={40}>
        {(() => {
          document.body.style.margin = '0'
          document.body.style.height = '100vh'
        })()}
        <Autocomplete
          title="Starwars names"
          onChange={handleChange}
          items={items}
        >
          {({ getInputProps, getRef, inputValue }) => (
            <TextInput
              placeholder="Starwars names"
              value={inputValue}
              innerRef={ref => getRef(ref)}
              {...getInputProps()}
            />
          )}
        </Autocomplete>
      </Box>
      <Box padding={40}>
        <Autocomplete
          title="Starwars names"
          onChange={handleChange}
          items={items}
        >
          {({ getInputProps, getRef, inputValue, openMenu }) => (
            <TextInput
              width={160}
              placeholder="Min width in effect"
              value={inputValue}
              innerRef={ref => getRef(ref)}
              {...getInputProps({
                onFocus: () => {
                  openMenu()
                }
              })}
            />
          )}
        </Autocomplete>
      </Box>
      <Box padding={40}>
        <Autocomplete onChange={handleChange} items={items}>
          {({ getInputProps, getRef, openMenu, inputValue }) => (
            <TextInput
              placeholder="Open on focus"
              value={inputValue}
              innerRef={ref => getRef(ref)}
              {...getInputProps({
                onFocus: () => {
                  openMenu()
                }
              })}
            />
          )}
        </Autocomplete>
      </Box>
      <Box padding={40}>
        <Autocomplete
          isFilterDisabled
          title="Disable filter"
          onChange={handleChange}
          items={items}
        >
          {({ getInputProps, openMenu, getRef, inputValue }) => (
            <TextInput
              placeholder="Disable filter and open on focus"
              value={inputValue}
              innerRef={ref => getRef(ref)}
              {...getInputProps({
                onFocus: () => {
                  openMenu()
                }
              })}
            />
          )}
        </Autocomplete>
      </Box>
      <Box padding={40}>
        <Autocomplete title="Suggestions" onChange={handleChange} items={items}>
          {({ getInputProps, getRef, openMenu, inputValue }) => (
            <TextInput
              placeholder="Open on focus with title"
              value={inputValue}
              innerRef={ref => getRef(ref)}
              {...getInputProps({
                onFocus: () => {
                  openMenu()
                }
              })}
            />
          )}
        </Autocomplete>
      </Box>
      <Box padding={40}>
        <Autocomplete onChange={handleChange} items={items}>
          {({
            getInputProps,
            getButtonProps,
            getRef,
            inputValue,
            toggleMenu
          }) => (
            <Box innerRef={ref => getRef(ref)} display="inline-block">
              <TextInput
                placeholder="Trigger with button"
                value={inputValue}
                {...getInputProps()}
              />
              <Button onClick={toggleMenu} {...getButtonProps()}>
                Trigger
              </Button>
            </Box>
          )}
        </Autocomplete>
      </Box>
    </Box>
  ))
  .add('Createable Autocomplete', () => (
    <Box padding={40}>
      <Heading>Createable Items</Heading>
      <Code>Supports string[] and object[]</Code>
      <Box display="flex">
        <Component initialState={{ seasons, selectedItem: seasons[0] }}>
          {({ state, setState }) => (
            <Box padding={40}>
              <Autocomplete
                title="Seasons"
                createable
                selectedItem={state.selectedItem}
                onChange={item => setState({ selectedItem: item })}
                onItemCreated={item =>
                  setState({
                    seasons: concat(item, seasons),
                    selectedItem: item
                  })
                }
                items={state.seasons}
              >
                {({ getInputProps, getRef, openMenu, inputValue }) => (
                  <TextInput
                    placeholder="Createable"
                    value={inputValue}
                    innerRef={ref => getRef(ref)}
                    {...getInputProps({
                      onFocus: () => {
                        openMenu()
                      }
                    })}
                  />
                )}
              </Autocomplete>
              <pre>{JSON.stringify(state.seasons, null, 3)}</pre>
            </Box>
          )}
        </Component>
        <Component initialState={{ objectItems, selectedItem: objectItems[0] }}>
          {({ state, setState }) => (
            <Box padding={40}>
              <Autocomplete
                title="Seasons"
                createable
                selectedItem={state.selectedItem}
                onChange={item => setState({ selectedItem: item })}
                onItemCreated={item => {
                  setState({
                    objectItems: [item].concat(objectItems),
                    selectedItem: item
                  })
                }}
                items={state.objectItems}
                itemToString={i => (i ? String(i.value) : '')}
              >
                {({ getInputProps, getRef, openMenu, inputValue }) => (
                  <TextInput
                    placeholder="Createable with Objects"
                    value={inputValue}
                    innerRef={ref => getRef(ref)}
                    {...getInputProps({
                      onFocus: () => {
                        openMenu()
                      }
                    })}
                  />
                )}
              </Autocomplete>
              <pre>{JSON.stringify(state.objectItems, null, 3)}</pre>
            </Box>
          )}
        </Component>
      </Box>
    </Box>
  ))
