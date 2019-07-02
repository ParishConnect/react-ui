import Box, { splitBoxProps } from '@parishconnect/box'
import {
  InjectedRemirrorProps,
  ManagedRemirrorProvider,
  RemirrorManager,
  useRemirror
} from '@remirror/react'
import * as React from 'react'
import { v1 } from 'uuid'
import { Card, Pane } from '../../../layers/index'
import { majorScale } from '../../../scales/index'
import { ThemeContext } from '../../../theme/index'
import { EditorProps } from './Editor'
import EditorToolbar from './EditorToolbar'
import FloatingMenu from './FloatingMenu'
import LinkManager from './LinkManager'
import editorStyles from './styles/editorStyles'
import { FormattingOptions } from './types'
import getExtensions from './utils/extensionFactory'

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

class DefaultEditorLayout extends React.PureComponent<any, EditorLayoutState> {
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
      toolbar,
      extraStyles: altEditorStyles,
      ...props
    } = this.props
    const theme = this.context

    const { matched, remaining } = splitBoxProps(containerProps!)
    const {
      matched: matchedInnerProps,
      remaining: remainingInnerProps
    } = splitBoxProps(props as any)

    return (
      <Card width="100%" {...matched}>
        <RemirrorManager placeholder={placeholder}>
          {getExtensions(formattingOptions, this.activateLink)}
          <Pane
            css={editorStyles(theme, altEditorStyles)}
            {...matchedInnerProps}
          >
            <ManagedRemirrorProvider
              attributes={{
                'data-editor-id': `parishconnect-${createEditorInstance()}`
              }}
              onFocus={this.setFocus}
              onBlur={this.unSetFocus}
              autoFocus={autoFocus}
              {...remaining}
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
      </Card>
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

export default DefaultEditorLayout
