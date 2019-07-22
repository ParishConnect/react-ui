import Box, { splitBoxProps } from '@parishconnect/box'
import {
  InjectedRemirrorProps,
  ManagedRemirrorProvider,
  RemirrorManager,
  useRemirror
} from '@remirror/react'
import * as React from 'react'
import { Pane } from '../../../layers/index'
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
  toolbarProps?: any
  allowImages?: boolean
  toolbarComponents?: React.ReactChild
  contentComponents?: React.ReactChild
  autoFocus?: boolean
  onSave?: any
}

interface EditorLayoutState {
  linkActivated: boolean
  imageActivated: boolean
  hasFocus: boolean
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

    const { matched, remaining } = splitBoxProps(containerProps)

    const {
      matched: matchedInnerProps,
      remaining: remainingInnerProps
    } = splitBoxProps(props)

    return (
      <Pane width="100%" {...matched}>
        <RemirrorManager placeholder={placeholder}>
          {getExtensions(formattingOptions, this.activateLink)}
          <Pane css={editorStyles(theme)} {...matchedInnerProps}>
            <ManagedRemirrorProvider
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
      <Box {...getRootProps()} />
    </Box>
  )
}

export default FullEditorLayout
