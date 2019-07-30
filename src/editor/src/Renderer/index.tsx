import { splitBoxProps } from '@parishconnect/box'
import { EMPTY_PARAGRAPH_NODE } from '@remirror/core'
import { RenderTree, RenderTreeProps } from '@remirror/renderer-react'
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
  RenderTreeProps & PaneProps
> {
  static contextType = ThemeContext
  render() {
    const { matched, remaining } = splitBoxProps(this.props)
    return (
      <Pane css={editorStyles(this.context)} {...matched}>
        <div className="remirror-editor">
          <RenderTree
            skipUnknownTypes={true}
            skipUnknownMarks={true}
            typeMap={TYPE_MAP}
            markMap={MARK_MAP}
            json={this.props.json || EMPTY_PARAGRAPH_NODE}
            {...remaining}
          />
        </div>
      </Pane>
    )
  }
}
