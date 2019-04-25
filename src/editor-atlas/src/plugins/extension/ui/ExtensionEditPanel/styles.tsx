import * as React from 'react'
import { Card } from '../../../../../../layers/index'
import Box from '@hennessyevan/aluminum-box'
import { scales } from '../../../../../../theme/src/default-theme/foundational-styles/index'

export const Toolbar = props => (
  <Card display="flex" background="white" padding={5}>
    {props.children}
  </Card>
)
export const Separator = () => (
  <Box
    borderLeft={`1px solid ${scales.neutral.N3}`}
    marginX={5}
    display="inline-block"
    width={1}
  />
)
