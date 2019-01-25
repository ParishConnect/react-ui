import { Node as PMNode } from 'prosemirror-model'

export interface Transformer<T> {
  encode(node: PMNode): T
}

export class PlainTransformer implements Transformer<string> {
  encode(node: PMNode): string {
    return node.textBetween(0, node.content.size, '\n\n')
  }
}
