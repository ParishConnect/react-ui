import { splitBoxProps } from '@parishconnect/box'
import { EMPTY_PARAGRAPH_NODE } from '@remirror/core'
import { RenderTree } from '@remirror/renderer-react'
import * as React from 'react'
import { Pane } from '../../../layers/index'
import { PaneProps } from '../../../layers/src/Pane'
import { ThemeContext } from '../../../theme/index'
import editorStyles from '../Editor/styles/editorStyles'
import { Doc, HeadingHandler, TextHandler } from './components'

const MARK_MAP = {
  em: 'em',
  strong: 'strong',
  code: 'code',
  link: 'a',
  underline: 'u',
  heading: 'h1'
}

const TYPE_MAP = {
  doc: Doc,
  paragraph: 'p',
  image: 'img',
  hard_break: 'br',
  text: TextHandler,
  heading: HeadingHandler
}

export default class Renderer extends React.PureComponent<
  PaneProps & { json: any }
> {
  static contextType = ThemeContext
  render() {
    const { matchedProps } = splitBoxProps(this.props as any)
    return (
      <Pane css={editorStyles(this.context)} {...matchedProps}>
        <div className="remirror-editor">
          <RenderTree
            skipUnknownTypes={false}
            skipUnknownMarks
            typeMap={TYPE_MAP}
            markMap={MARK_MAP}
            json={this.props.json || EMPTY_PARAGRAPH_NODE}
          />
        </div>
      </Pane>
    )
  }
}
