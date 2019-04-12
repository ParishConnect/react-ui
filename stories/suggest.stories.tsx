import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { Suggest, majorScale, minorScale } from '../src'
import MenuItem from '../src/menu/src/MenuItem'
import Component from '@reactions/component'

import {
  areFilmsEqual,
  createFilm,
  filmSelectProps,
  maybeAddCreatedFilmToArrays,
  maybeDeleteCreatedFilmFromArrays,
  renderCreateFilmOption
} from './helpers/suggest'

storiesOf('suggest', module).add('Createable Suggest', () => (
  <Component
    initialState={{
      items: [],
      createdItems: [],
      film: undefined,
      loading: true
    }}
    didMount={({ setState }) => {
      setTimeout(() => {
        setState({ items: filmSelectProps.items, loading: false })
      }, 2500)
    }}
  >
    {({ state, setState }) => (
      <Box width="100%" height="100%" display="flex" padding={40}>
        <Suggest
          {...filmSelectProps}
          inputProps={{
            label: 'Createable',
            placeholder: 'Custom Placeholder...',
            maxWidth: majorScale(40),
            width: '100%'
          }}
          popoverProps={{
            statelessProps: { maxWidth: majorScale(40), width: '100%' }
          }}
          items={state.items}
          resetOnSelect
          closeOnSelect
          createNewItemFromQuery={createFilm}
          createNewItemRenderer={renderCreateFilmOption}
          noResults={
            <MenuItem marginTop={minorScale(1)} disabled={true}>
              {state.loading ? 'Loading...' : 'No Results'}
            </MenuItem>
          }
          selectedItem={state.film}
          itemsEqual={areFilmsEqual}
          inputValueRenderer={film => film.name}
          activeItem={state.film}
          onItemSelect={(film, rest) => {
            console.log(rest)

            // delete the old film from the list if it was newly created
            const { createdItems, items } = maybeDeleteCreatedFilmFromArrays(
              state.items,
              state.createdItems,
              state.film
            )
            // add the new film to the list if it is newly created
            const {
              createdItems: nextCreatedItems,
              items: nextItems
            } = maybeAddCreatedFilmToArrays(items, createdItems, film)

            setState({
              createdItems: nextCreatedItems,
              film,
              items: nextItems
            })
          }}
        />
      </Box>
    )}
  </Component>
))
