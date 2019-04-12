import * as React from 'react'
import { PlusIcon, Text, XIcon } from '../../src'
import MenuOption from '../../src/menu/src/MenuOption'
import uuid from 'uuid'

export interface IFilm {
  id: string
  name: string
}

export const MASS_SEASONS: IFilm[] = [
  { id: uuid.v4(), name: 'Easter' },
  { id: uuid.v4(), name: 'Christmas' },
  { id: uuid.v4(), name: 'Pentecost' },
  { id: uuid.v4(), name: 'Advent' },
  { id: uuid.v4(), name: 'Holy Week' }
]

export const renderFilm = (film, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuOption
      isSelected={film.id !== '' && modifiers.active}
      // disabled={modifiers.disabled}
      key={film.id}
      onSelect={e => {
        console.log(e)

        handleClick()
      }}
    >
      {highlightText(film.name, query)}
    </MenuOption>
  )
}

export const renderCreateFilmOption = (
  query: string,
  active: boolean,
  handleClick: React.MouseEventHandler<HTMLElement>
) => (
  <MenuOption icon={PlusIcon} isSelected={active} onSelect={handleClick}>
    {`Create "${query}"`}
  </MenuOption>
)

export const filterFilm = (query, film, _index, exactMatch) => {
  const normalizedValue = film.name.toLowerCase()
  const normalizedQuery = query.toLowerCase()

  if (exactMatch) {
    return normalizedValue === normalizedQuery
  } else {
    return (
      `${film.rank}. ${normalizedValue} ${film.year}`.indexOf(
        normalizedQuery
      ) >= 0
    )
  }
}

function highlightText(text: string, query: string) {
  let lastIndex = 0
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars)
  if (words.length === 0) {
    return [text]
  }
  const regexp = new RegExp(words.join('|'), 'gi')
  const tokens: React.ReactNode[] = []
  while (true) {
    const match = regexp.exec(text)
    if (!match) {
      break
    }
    const length = match[0].length
    const before = text.slice(lastIndex, regexp.lastIndex - length)
    if (before.length > 0) {
      tokens.push(before)
    }
    lastIndex = regexp.lastIndex
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>)
  }
  const rest = text.slice(lastIndex)
  if (rest.length > 0) {
    tokens.push(rest)
  }
  return tokens
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
}

export const filmSelectProps = {
  itemPredicate: filterFilm,
  itemRenderer: renderFilm,
  items: MASS_SEASONS
}

export function createFilm(name: string): IFilm {
  return {
    id: uuid.v4(),
    name
  }
}

export function areFilmsEqual(filmA: IFilm, filmB: IFilm) {
  return filmA.name.toLowerCase() === filmB.name.toLowerCase()
}

export function doesFilmEqualQuery(film: IFilm, query: string) {
  return film.name.toLowerCase() === query.toLowerCase()
}

export function arrayContainsFilm(films: IFilm[], filmToFind: IFilm): boolean {
  return films && films.some((film: IFilm) => film.name === filmToFind.name)
}

export function addFilmToArray(films: IFilm[] = [], filmToAdd: IFilm) {
  return [filmToAdd, ...films]
}

export function deleteFilmFromArray(films: IFilm[], filmToDelete: IFilm) {
  return films.filter(film => film !== filmToDelete)
}

export function maybeAddCreatedFilmToArrays(
  items: IFilm[],
  createdItems: IFilm[],
  film: IFilm
): { createdItems: IFilm[]; items: IFilm[] } {
  const isNewlyCreatedItem = !arrayContainsFilm(items, film)
  return {
    createdItems: isNewlyCreatedItem
      ? addFilmToArray(createdItems, film)
      : createdItems,
    // Add a created film to `items` so that the film can be deselected.
    items: isNewlyCreatedItem ? addFilmToArray(items, film) : items
  }
}

export function maybeDeleteCreatedFilmFromArrays(
  items: IFilm[],
  createdItems: IFilm[],
  film: IFilm
): { createdItems: IFilm[]; items: IFilm[] } {
  const wasItemCreatedByUser = arrayContainsFilm(createdItems, film)

  // Delete the item if the user manually created it.
  return {
    createdItems: wasItemCreatedByUser
      ? deleteFilmFromArray(createdItems, film)
      : createdItems,
    items: wasItemCreatedByUser ? deleteFilmFromArray(items, film) : items
  }
}
