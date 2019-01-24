import { Schema, Node as PMNode } from 'prosemirror-model'

export const traverseNode = (node: PMNode, schema: Schema): void => {
  let cxhtml = ''
  const { unsupportedInline, unsupportedBlock } = schema.nodes
  if (node.attrs && node.attrs.cxhtml) {
    cxhtml = node.attrs.cxhtml
  }

  if (node.type === unsupportedInline) {
    return
  } else if (node.type === unsupportedBlock) {
    return
  } else {
    node.content.forEach(node => traverseNode(node, schema))
  }
}
