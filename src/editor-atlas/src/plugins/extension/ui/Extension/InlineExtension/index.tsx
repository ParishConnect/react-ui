import { Node as PmNode } from 'prosemirror-model'
import * as React from 'react'
import { Component } from 'react'
import { MacroProvider } from '../../../../plugin-macro'
import ExtensionLozenge from '../Lozenge'
import { Overlay } from '../styles'
import { Wrapper } from './styles'

export interface Props {
  node: PmNode
  macroProvider?: MacroProvider
  children?: React.ReactNode
}

export default class InlineExtension extends Component<Props, any> {
  render() {
    const { node, children } = this.props

    const hasChildren = !!children

    const className = hasChildren
      ? 'with-overlay with-children'
      : 'with-overlay'

    return (
      <Wrapper className={`extension-container ${className}`}>
        <Overlay className="extension-overlay" />
        {children ? children : <ExtensionLozenge node={node} />}
      </Wrapper>
    )
  }
}
