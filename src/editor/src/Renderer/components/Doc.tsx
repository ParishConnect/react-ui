import * as React from 'react'
import { SubRenderTreeProps, RenderTree } from '@remirror/renderer-react'

export const Doc: React.FC<SubRenderTreeProps> = ({ node, ...props }) => {
  const content = node.content
  if (!content || !content.length) {
    return null
  }

  const children = content.map((child, ii) => {
    return <RenderTree json={child} {...props as any} key={ii} />
  })

  return <div {...node.attrs || {}}>{children}</div>
}
