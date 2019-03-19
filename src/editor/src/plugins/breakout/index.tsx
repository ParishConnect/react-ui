import { breakout } from '@atlaskit/adf-schema'
import { calcBreakoutWidth } from '@atlaskit/editor-common'
import { Plugin } from 'prosemirror-state'
import * as React from 'react'
import styled from 'styled-components'
import { ReactNodeView } from '../../nodeviews'
import { EditorPlugin } from '../../types'
import WithPluginState from '../../ui/WithPluginState'
import { pluginKey as widthPluginKey, WidthPluginState } from '../width'

export const Wrapper = styled.div`
  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],
  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {
    margin-left: 50%;
    transform: translateX(-50%);
  }
`

class BreakoutView extends ReactNodeView {
  getContentDOM() {
    if (typeof document !== 'undefined') {
      const dom = document.createElement('div')
      // MutationObserver bug with nodeviews @see ED-6062
      dom.className = 'fabric-editor-breakout-mark-dom'
      return { dom }
    }
  }

  render(props, forwardRef) {
    const { mode } = this.node.attrs
    return (
      <WithPluginState
        editorView={this.view}
        plugins={{ widthState: widthPluginKey }}
        render={({
          widthState = { width: 0 }
        }: {
          widthState?: WidthPluginState
        }) => (
          <Wrapper
            className="fabric-editor-breakout-mark"
            data-layout={mode}
            style={{ width: calcBreakoutWidth(mode, widthState.width) }}
          >
            <div ref={forwardRef} />
          </Wrapper>
        )}
      />
    )
  }
}

function createPlugin({ portalProviderAPI, providerFactory }) {
  return new Plugin({
    props: {
      nodeViews: {
        breakout: (node, view, getPos) => {
          return new BreakoutView(node, view, getPos, portalProviderAPI, {
            providerFactory
          }).init()
        }
      }
    }
  })
}

const breakoutPlugin: EditorPlugin = {
  pmPlugins() {
    return [{ name: 'breakout', plugin: createPlugin }]
  },
  marks() {
    return [{ name: 'breakout', mark: breakout }]
  }
}

export default breakoutPlugin
