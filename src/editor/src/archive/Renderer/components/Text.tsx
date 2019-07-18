import * as React from 'react'
import { ObjectNode, ObjectMark, isString } from '@remirror/core'
import { MarkMap } from '../../Editor/types/index'
import warning from '../../../../lib/warning'

export interface TextHandlerProps {
  node: ObjectNode
  markMap: MarkMap
  skipUnknownMarks?: boolean
}

export const normalizeMark = (mark: ObjectMark | string) =>
  isString(mark) ? { type: mark, attrs: {} } : { attrs: {}, ...mark }

export const TextHandler: React.FC<TextHandlerProps> = ({ node, ...props }) => {
  if (!node.text) {
    return null
  }

  const textElement = <>{node.text}</>

  if (!node.marks) {
    return textElement
  }

  const fn = (child: JSX.Element, mark: ObjectMark | string) => {
    const normalized = normalizeMark(mark)
    const MarkHandler = props.markMap[normalized.type]

    if (!MarkHandler) {
      if (!props.skipUnknownMarks) {
        warning(
          !props.skipUnknownMarks,
          'No handler for mark type `' + normalized.type + '` registered'
        )
      }

      return child
    }

    return <MarkHandler {...normalized.attrs}>{child}</MarkHandler>
  }

  // Use assigned mark handlers
  return node.marks.reduce<JSX.Element>(fn, textElement)
}
