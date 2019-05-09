import { BoxProps, splitBoxProps } from '@hennessyevan/aluminum-box'
import { EditorView } from '@remirror/core'
import {
  InjectedRemirrorProps,
  ManagedRemirrorEditor,
  RemirrorManager
} from '@remirror/react'
import * as React from 'react'
import { v1 } from 'uuid'
import { Card, Pane } from '../../../layers/index'
import { majorScale } from '../../../scales/index'
import { ThemeContext } from '../../../theme/index'
import { EditorProps } from './Editor'
import EditorToolbar from './EditorToolbar'
import FloatingMenu from './FloatingMenu'
import ImageManager from './ImageManager'
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

class DefaultEditorLayout extends React.PureComponent<
  EditorLayoutProps,
  EditorLayoutState
> {
  static contextType = ThemeContext
  static defaultProps = {
    floatingMenu: false,
    toolbar: true,
    containerProps: {
      paddingBottom: majorScale(1)
    },
    formattingOptions: {
      bold: true,
      italic: true,
      underline: true,
      link: true,
      blockquote: false,
      heading: false
    },
    allowImages: true
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

  private activateImage = () => {
    this.setState({ imageActivated: true })
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
      toolbar,
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
      <Card width="100%" {...matchedProps}>
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
              {toolbar && (
                <EditorToolbar
                  disabled={false}
                  toolbarComponents={toolbarComponents}
                  formattingOptions={formattingOptions}
                  allowImages={allowImages}
                  linkActivated={this.state.linkActivated}
                  deactivateLink={this.deactivateLink}
                  activateLink={this.activateLink}
                  {...toolbarProps}
                />
              )}
              {floatingMenu && <FloatingMenu />}
              <LinkManager
                linkActivated={this.state.linkActivated}
                deactivateLink={this.deactivateLink}
                activateLink={this.activateLink}
              />
              {allowImages && <ImageManager />}
              {contentComponents && contentComponents}
            </ManagedRemirrorEditor>
          </Pane>
        </RemirrorManager>
      </Card>
    )
  }
}

export default DefaultEditorLayout
