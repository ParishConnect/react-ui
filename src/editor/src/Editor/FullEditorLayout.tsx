import Box, { splitBoxProps } from '@parishconnect/box'
import {
  InjectedRemirrorProps,
  ManagedRemirrorProvider,
  RemirrorManager,
  useRemirror
} from '@remirror/react'
import getExtensions from './utils/extensionFactory'
import * as React from 'react'
import { v1 } from 'uuid'
import { Pane } from '../../../layers/index'
import { ThemeContext } from '../../../theme/index'
import { EditorProps } from './Editor'
import EditorToolbar from './EditorToolbar'
import FloatingMenu from './FloatingMenu'
import LinkManager from './LinkManager'
import editorStyles from './styles/editorStyles'
import { FormattingOptions } from './types'
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  HorizontalRuleExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  LinkExtensionOptions,
  ListItemExtension,
  OrderedListExtension,
  SSRHelperExtension,
  StrikeExtension,
  UnderlineExtension
} from '@remirror/core-extensions'

interface EditorLayoutProps
  extends Partial<EditorProps & InjectedRemirrorProps> {
  floatingMenu?: boolean
  toolbar?: boolean
  containerProps?: any
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

class FullEditorLayout extends React.PureComponent<
  EditorLayoutProps,
  EditorLayoutState
> {
  static contextType = ThemeContext
  static defaultProps = {
    floatingMenu: false,
    toolbar: true,
    formattingOptions: {
      bold: true,
      italic: true,
      underline: true,
      blockquote: true,
      heading: true,
      link: true
    },
    allowImages: true,
    containerProps: {}
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

  public onSave = (view: any) => {
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
      ...props
    } = this.props
    const theme = this.context

    const { matchedProps, remainingProps } = splitBoxProps(containerProps!)
    const {
      matchedProps: matchedInnerProps,
      remainingProps: remainingInnerProps
    } = splitBoxProps(props as any)

    return (
      <Pane width="100%" {...matchedProps}>
        <RemirrorManager placeholder={placeholder}>
          {getExtensions(formattingOptions, this.activateLink)}
          <Pane css={editorStyles(theme)} {...matchedInnerProps}>
            <ManagedRemirrorProvider
              attributes={{
                'data-editor-id': `parishconnect-${createEditorInstance()}`
              }}
              onFocus={this.setFocus}
              onBlur={this.unSetFocus}
              autoFocus={autoFocus}
              {...remainingProps}
              {...remainingInnerProps}
            >
              <InnerEditor
                formattingOptions={formattingOptions}
                toolbarComponents={toolbarComponents}
                disabled={false}
                linkActivated={this.state.linkActivated}
                deactivateLink={this.deactivateLink}
                activateLink={this.activateLink}
                toolbarProps={toolbarProps}
                contentComponents={contentComponents || null}
                showFloatingMenu={floatingMenu}
                toolbar={toolbar}
              />
            </ManagedRemirrorProvider>
          </Pane>
        </RemirrorManager>
      </Pane>
    )
  }
}

const InnerEditor = ({
  formattingOptions,
  toolbarComponents,
  disabled,
  linkActivated,
  deactivateLink,
  activateLink,
  toolbarProps,
  contentComponents,
  showFloatingMenu,
  toolbar
}) => {
  const { getRootProps } = useRemirror()
  return (
    <Box>
      {toolbar && (
        <EditorToolbar
          disabled={disabled}
          toolbarComponents={toolbarComponents}
          formattingOptions={formattingOptions}
          linkActivated={linkActivated}
          deactivateLink={deactivateLink}
          activateLink={activateLink}
          {...toolbarProps}
        />
      )}
      {showFloatingMenu && <FloatingMenu />}
      <LinkManager
        linkActivated={linkActivated}
        deactivateLink={deactivateLink}
        activateLink={activateLink}
      />
      {contentComponents && contentComponents}
      <div {...getRootProps()} />
    </Box>
  )
}

export default FullEditorLayout
