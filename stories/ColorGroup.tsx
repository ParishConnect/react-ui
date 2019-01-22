import * as React from 'react'
import { Pane, Heading } from '../src'
import Swatch from './Swatch'

interface ColorGroupProps {
  title?: React.ReactNode
  colorGroup?: any
  name?: any
}

const ColorGroup = (props: ColorGroupProps) => {
  return (
    <Pane marginTop={32} minWidth={160}>
      <Pane borderBottom paddingBottom={8}>
        <Heading>{props.title}</Heading>
      </Pane>
      <Pane>
        {Object.keys(props.colorGroup).map(key => {
          return (
            <Swatch
              key={key}
              color={props.colorGroup[key]}
              name={key}
              property={props.name(key)}
            />
          )
        })}
      </Pane>
    </Pane>
  )
}

export default ColorGroup
