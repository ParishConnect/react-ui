import { splitBoxProps } from '@hennessyevan/aluminum-box'
import { RenderTree } from '@remirror/renderer-react'
import * as React from 'react'
import { Pane } from '../../../layers/index'
import { ThemeContext } from '../../../theme/index'
import editorStyles from '../Editor/styles/editorStyles'
import { EMPTY_OBJECT_NODE } from '@remirror/core'
import { PaneProps } from '../../../layers/src/Pane'

export default class Renderer extends React.PureComponent<PaneProps> {
  static contextType = ThemeContext
  render() {
    const { matchedProps } = splitBoxProps(this.props)
    return (
      <Pane className={editorStyles(this.context)} {...matchedProps}>
        <div className="remirror-editor">
          <RenderTree
            skipUnknownTypes={false}
            skipUnknownMarks
            json={this.props.json || EMPTY_OBJECT_NODE}
          />
        </div>
      </Pane>
    )
  }
}
