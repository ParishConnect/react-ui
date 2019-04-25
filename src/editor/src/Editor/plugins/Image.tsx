import {
  Attrs,
  bool,
  Cast,
  CommandFunction,
  DispatchFunction,
  EditorSchema,
  EditorState,
  NodeExtension,
  NodeExtensionOptions,
  NodeExtensionSpec,
  NodeType,
  SchemaNodeTypeParams
} from '@remirror/core'
import { ResolvedPos } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import {
  findChildrenByType,
  findSelectedNodeOfType,
  ContentNodeWithPos
} from 'prosemirror-utils'

/**
 * Update the selection with the provided MarkType
 *
 * @param type
 * @param attrs
 */
const updateNode = (type: NodeType, attrs: Attrs = {}): CommandFunction => (
  state,
  dispatch
) => {
  const { pos, parent } = state.doc.resolve(state.selection.from)
  const imageNode: ContentNodeWithPos | undefined = findSelectedNodeOfType(
    type
  )(state.selection)

  if (dispatch && imageNode) {
    dispatch(
      state.tr
        .setNodeMarkup(pos, type, {
          ...imageNode.node.attrs,
          ...attrs
        })
        .setSelection(state.selection)
    )
  }
  return true
}

/**
 * Update the selection with the provided MarkType
 *
 * @param type
 * @param attrs
 */
const removeNode = () => (state: EditorState, dispatch: DispatchFunction) => {
  if (dispatch) {
    dispatch(state.tr.deleteSelection())
  }
  return true
}

/**
 * Update the selection with the provided MarkType
 *
 * @param type
 * @param attrs
 */
const addImageNode = (attrs: Attrs = {}) => (
  state: EditorState,
  dispatch: DispatchFunction
) => {
  if (dispatch) {
    dispatch(
      state.tr.replaceSelectionWith(
        state.schema.nodes.image.createChecked({
          ...attrs,
          src:
            'https://res.cloudinary.com/parishconnect/image/upload/v1555431640/posts/palm_sunday.jpg'
        })
      )
    )
  }
  return true
}

const hasCursor = <T extends {}>(
  arg: T
): arg is T & { $cursor: ResolvedPos } => {
  return bool(Cast(arg).$cursor)
}

interface ImageOptions extends NodeExtensionOptions {
  activationHandler?(): void
}

export class Image extends NodeExtension<ImageOptions> {
  get name() {
    //@ts-ignore
    return 'image' as const
  }

  get defaultOptions() {
    return {
      activationHandler: () => false
    }
  }

  get schema(): NodeExtensionSpec {
    return {
      inline: true,
      attrs: {
        src: {},
        width: { default: '50%' },
        layout: { default: 'center' },
        alt: { default: null },
        title: { default: null },
        ...this.extraAttrs()
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: dom => ({
            src: Cast<Element>(dom).getAttribute('src'),
            title: Cast<Element>(dom).getAttribute('title'),
            alt: Cast<Element>(dom).getAttribute('alt'),
            width: Cast<Element>(dom).getAttribute('width')
          })
        }
      ],
      toDOM: node => ['img', node.attrs]
    }
  }

  public commands({ type }: SchemaNodeTypeParams) {
    return {
      update: (attrs?: Attrs) => updateNode(type, attrs),
      add: (attrs?: Attrs) => addImageNode(attrs),
      remove: () => removeNode()
    }
  }

  public plugin() {
    return new Plugin<EditorSchema>({
      props: {
        nodeViews: {
          image(node, view, getPos) {
            return new ImageView(node, view, getPos)
          }
        },
        handleDOMEvents: {
          drop(view, e) {
            const event = Cast<DragEvent>(e)
            const hasFiles =
              event.dataTransfer &&
              event.dataTransfer.files &&
              event.dataTransfer.files.length

            if (!hasFiles) {
              return false
            }

            const images = Array.from(event.dataTransfer!.files).filter(file =>
              /image/i.test(file.type)
            )

            if (images.length === 0) {
              return false
            }

            event.preventDefault()

            const { schema } = view.state
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY
            })

            images.forEach(image => {
              const reader = new FileReader()

              reader.onload = readerEvent => {
                const node = schema.nodes.image.create({
                  src:
                    readerEvent &&
                    readerEvent.target &&
                    Cast(readerEvent.target).result
                })
                const transaction = view.state.tr.insert(coordinates!.pos, node)
                view.dispatch(transaction)
              }
              reader.readAsDataURL(image)
            })
            return true
          }
        }
      }
    })
  }
}

class ImageView {
  dom: HTMLSpanElement
  img: HTMLImageElement
  constructor(node, view, getPos) {
    const outer = document.createElement('div')
    outer.classList.add('img-wrapper')
    outer.setAttribute('width', node.attrs.width)
    outer.setAttribute('layout', node.attrs.layout)

    const img = document.createElement('img')
    img.setAttribute('src', node.attrs.src)
    img.style.width = '100%'

    outer.appendChild(img)

    this.dom = outer
    this.img = img
  }

  selectNode() {
    this.dom.classList.add('ProseMirror-selectednode')
  }

  deselectNode() {
    this.dom.classList.remove('ProseMirror-selectednode')
  }
}
