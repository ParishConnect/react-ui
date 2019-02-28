import * as React from 'react'
import { Card } from '../../../../../layers/index'

export const Dropdown = props => (
  <Card
    display="flex"
    flexDirection="column"
    background="white"
    elevation={2}
    paddingY={4}
  >
    {props.children}
  </Card>
)
