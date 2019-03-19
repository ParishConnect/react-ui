import { calcBreakoutWidth } from '@atlaskit/editor-common'
import { Node as PmNode } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'
import * as React from 'react'
import { Component } from 'react'
import WithPluginState from '../../../../../ui/WithPluginState'
import { MacroProvider } from '../../../../plugin-macro'
import {
  pluginKey as widthPluginKey,
  WidthPluginState
} from '../../../../width'
import ExtensionLozenge from '../Lozenge'
import { Overlay } from '../styles'
import { Content, ContentWrapper, Header, Wrapper } from './styles'

export interface Props {
  node: PmNode
  macroProvider?: MacroProvider
  handleContentDOMRef: (node: HTMLElement | null) => void
  onSelectExtension: (hasBody) => void
  children?: React.ReactNode
  view: EditorView
}

export default class Extension extends Component<Props, any> {
  private onSelectExtension = () => {
    const { onSelectExtension, node } = this.props
    onSelectExtension(node.type.name === 'bodiedExtension')
  }

  render() {
    const { node, handleContentDOMRef, children, view } = this.props

    const hasBody = node.type.name === 'bodiedExtension'
    const hasChildren = !!children

    return (
      <WithPluginState
        editorView={view}
        plugins={{
          widthState: widthPluginKey
        }}
        render={({
          widthState = { width: 0 }
        }: {
          widthState?: WidthPluginState
        }) => {
          return (
            <Wrapper
              data-layout={node.attrs.layout}
              className={`extension-container ${hasBody ? '' : 'with-overlay'}`}
              style={{
                width: calcBreakoutWidth(node.attrs.layout, widthState.width)
              }}
            >
              <Overlay className="extension-overlay" />
              <Header
                contentEditable={false}
                onClick={this.onSelectExtension}
                className={hasChildren ? 'with-children' : ''}
              >
                {children ? children : <ExtensionLozenge node={node} />}
              </Header>
              {hasBody && (
                <ContentWrapper>
                  <Content
                    innerRef={handleContentDOMRef}
                    className="extension-content"
                  />
                </ContentWrapper>
              )}
            </Wrapper>
          )
        }}
      />
    )
  }
}
