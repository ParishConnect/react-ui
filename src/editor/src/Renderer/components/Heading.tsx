import * as React from 'react'
import { ObjectNode } from '@remirror/core'
import { MarkMap } from '../../Editor/types/index'
import { TextHandler } from './Text'

export const HeadingHandler: React.FC<{
  node: ObjectNode
  markMap: MarkMap
}> = props => {
  const content = props.node.content
  if (!content) {
    return null
  }

  const level = props.node.attrs ? props.node.attrs['level'] : 1

  return React.createElement(
    `h${level}`,
    {},
    content.map((node, ii) => {
      return <TextHandler key={ii} {...{ ...props, node }} />
    })
  )
}
