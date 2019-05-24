import {
  NodeExtension,
  NodeExtensionOptions,
  NodeExtensionSpec,
  SchemaNodeTypeParams,
  nodeActive,
  EditorState
} from '@remirror/core'
import { Plugin } from 'prosemirror-state'
import { isMediaSelected } from '../utils/mediaUtils'
import { ReactNodeView, NodeViewComponentProps } from '@remirror/react'
import Box from '@parishconnect/box'
import * as React from 'react'
import { get } from 'lodash'
import {
  contains,
  isNodeSelection,
  hasParentNodeOfType,
  hasParentNode,
  findSelectedNodeOfType,
  findParentNodeOfTypeClosestToPos
} from 'prosemirror-utils'
import { ResolvedPos } from 'prosemirror-model'

const ImageWrapperComponent: React.FC<NodeViewComponentProps> = ({
  node,
  view
}) => {
  const selectedNode = findSelectedNodeOfType([
    view.state.schema.nodes.mediaWrapper,
    view.state.schema.nodes.image
  ])(view.state.selection)

  console.log(selectedNode)

  return (
    <Box id={selectedNode && 'active'}>
      <img {...node.childCount > 0 && node.child(node.childCount - 1).attrs} />
    </Box>
  )
}

export interface MediaWrapperOptions extends NodeExtensionOptions {
  /**
   * Return true to intercept the activation. This is useful for showing a dialog to replace the selected text.
   */
  activationHandler?(): void
}

export class MediaWrapper extends NodeExtension<MediaWrapperOptions> {
  get name() {
    //@ts-ignore
    return 'mediaWrapper' as const
  }

  get defaultOptions() {
    return {
      activationHandler: () => false
    }
  }

  get schema(): NodeExtensionSpec {
    return {
      attrs: {
        layout: { default: null },
        align: { default: null },
        ...this.extraAttrs()
      },
      content: 'image*',
      group: 'inline',
      inline: true,
      draggable: false,
      selectable: true,
      parseDOM: [{ tag: 'div' }],
      toDOM: node => ['div', { class: 'img-wrapper', ...node.attrs }, 0]
    }
  }

  public plugin({
    getPortalContainer,
    getEditorState,
    type
  }: SchemaNodeTypeParams) {
    return new Plugin({
      props: {
        handleClick(view, pos) {
          const selectedNode = findSelectedNodeOfType([
            view.state.schema.nodes.mediaWrapper,
            view.state.schema.nodes.image
          ])(view.state.selection)

          console.log(selectedNode)

          return true
        }
        // nodeViews: {
        //   mediaWrapper: ReactNodeView.createNodeView({
        //     Component: ImageWrapperComponent,
        //     getPortalContainer,
        //     props: {}
        //   })
        // }
      }
    })
  }
}
