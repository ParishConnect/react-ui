import { EditorState, NodeSelection } from 'prosemirror-state'
import { Schema, Node } from 'prosemirror-model'

export const isMediaSelected = (state: EditorState): boolean => {
  const { mediaWrapper } = state.schema.nodes

  return (
    state.selection instanceof NodeSelection &&
    state.selection.node.type === mediaWrapper
  )
}

export const canInsertMedia = (state: EditorState): boolean => {
  const { mediaWrapper } = state.schema.nodes
  const { $to } = state.selection

  if (mediaWrapper) {
    for (let d = $to.depth; d >= 0; d--) {
      let index = $to.index(d)
      if ($to.node(d).canReplaceWith(index, index, mediaWrapper)) {
        return true
      }
    }
  }
  return false
}

export const createExternalMediaNode = (
  url: string,
  schema: Schema
): Node | null => {
  const { image, mediaWrapper } = schema.nodes
  if (!image || !mediaWrapper) {
    return null
  }

  const imageNode = image.createChecked({
    type: 'external',
    url
  })
  return mediaWrapper.createChecked({}, imageNode)
}
