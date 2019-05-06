import { BoxProps, splitBoxProps } from '@hennessyevan/aluminum-box'
import { EditorView } from '@remirror/core'
import {
  InjectedRemirrorProps,
  ManagedRemirrorEditor,
  RemirrorManager
} from '@remirror/react'
import * as React from 'react'
import { v1 } from 'uuid'
import { Pane } from '../../../layers/index'
import { ThemeContext } from '../../../theme/index'
import { EditorProps } from './Editor'
import LinkManager from './LinkManager'
import editorStyles from './styles/editorStyles'
import { FormattingOptions } from './types'
import getExtensions from './utils/extensionFactory'

interface EditorLayoutProps
  extends Partial<EditorProps & InjectedRemirrorProps> {
  floatingMenu?: boolean
  toolbar?: boolean
  containerProps?: BoxProps
  formattingOptions: FormattingOptions
}

interface EditorLayoutState {
  linkActivated: boolean
  imageActivated: boolean
  hasFocus: boolean
}

function createEditorInstance() {
  return v1()
}

class MinimalEditorLayout extends React.PureComponent<
  EditorLayoutProps,
  EditorLayoutState
> {
  static contextType = ThemeContext
  static defaultProps = {
    floatingMenu: false,
    toolbar: false,
    containerProps: {
      border: true
    },
    formattingOptions: {
      bold: true,
      italic: true,
      underline: true,
      link: true,
      blockquote: false,
      heading: false
    },
    allowImages: false
  }

  public state: EditorLayoutState = {
    linkActivated: false,
    imageActivated: false,
    hasFocus: false
  }

  private activateLink = () => {
    this.setState({ linkActivated: true })
  }

  private deactivateLink = () => {
    this.setState({ linkActivated: false })
  }

  private setFocus = () => {
    this.setState({ hasFocus: true })
  }
  private unSetFocus = () => {
    this.setState({ hasFocus: false })
  }

  public onSave = (view: EditorView) => {
    this.props.onSave(view)
  }

  render() {
    const {
      placeholder,
      floatingMenu,
      formattingOptions,
      allowImages,
      containerProps,
      toolbarComponents,
      contentComponents,
      autoFocus,
      toolbarProps,
      extraStyles: altEditorStyles,
      ...props
    } = this.props
    const theme = this.context

    const { matchedProps, remainingProps } = splitBoxProps(containerProps!)
    const {
      matchedProps: matchedInnerProps,
      remainingProps: remainingInnerProps
    } = splitBoxProps(props)

    return (
      <Pane width="100%" {...matchedProps}>
        <RemirrorManager>
          {getExtensions(formattingOptions, this.activateLink)}
          <Pane
            className={editorStyles(theme, altEditorStyles)}
            {...matchedInnerProps}
          >
            <ManagedRemirrorEditor
              attributes={{
                'data-editor-id': `parishconnect-${createEditorInstance()}`
              }}
              onFocus={this.setFocus}
              onBlur={this.unSetFocus}
              placeholder={placeholder}
              autoFocus={autoFocus}
              {...remainingProps}
              {...remainingInnerProps}
            >
              <LinkManager
                linkActivated={this.state.linkActivated}
                deactivateLink={this.deactivateLink}
                activateLink={this.activateLink}
              />
              {contentComponents && contentComponents}
            </ManagedRemirrorEditor>
          </Pane>
        </RemirrorManager>
      </Pane>
    )
  }
}

export default MinimalEditorLayout
