import styled from 'styled-components'
import { HTMLAttributes, ComponentClass } from 'react'

//@ts-ignore
export const BlockTypeMenuItem: ComponentClass<
  HTMLAttributes<{}> & {
    tagName: string
    selected?: boolean
  }
> = styled.div<{ tagName: string; selected?: boolean }>`
  ${props => (props.selected ? `${props.tagName} { color: white }` : '')};
`
