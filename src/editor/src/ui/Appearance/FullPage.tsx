import * as React from 'react'
import styled from 'styled-components'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { colors } from '@atlaskit/theme'
import { akEditorMenuZIndex } from '@atlaskit/editor-common'
import { EditorAppearanceComponentProps, EditorAppearance } from '../../types'
import Avatars from '../../plugins/collab-edit/ui/avatars'
import PluginSlot from '../PluginSlot'
import Toolbar from '../Toolbar'
import ContentStyles from '../ContentStyles'
import { ClickAreaBlock } from '../Addon'
import { akEditorToolbarKeylineHeight } from '../../styles'
import rafSchedule from 'raf-schd'
import { scrollbarStyles } from '../styles'
import WidthEmitter from '../WidthEmitter'

const GUTTER_PADDING = 32

const ScrollContainer = styled(ContentStyles)`
  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  ${scrollbarStyles};
`
ScrollContainer.displayName = 'ScrollContainer'

const ContentArea = ({ maxWidth = 'auto', children, ...props }) => (
  <Box
    lineHeight="24px"
    height="100%"
    width="100%"
    maxWidth={maxWidth}
    paddingTop={50}
    marginX="auto"
    display="flex"
    flexDirection="column"
    flexGrow={1}
    paddingBottom={55}
    css={{
      '& .ProseMirror': {
        flexGrow: 1,
        boxSizing: 'border-box'
      },

      '&& .ProseMirror': {
        '& > *': {
          clear: 'both'
        },
        '> p, > ul, > ol, > h1, > h2, > h3, > h4, > h5, > h6': {
          clear: 'none'
        }
      }
    }}
    {...props}
  >
    {children}
  </Box>
)
ContentArea.displayName = 'ContentArea'

interface MainToolbarProps extends BoxProps {
  showKeyline?: boolean
}

const MainToolbar = ({ showKeyline, children, ...props }: MainToolbarProps) => (
  <Box
    position="relative"
    alignItems="center"
    boxShadow={
      showKeyline
        ? `0 ${akEditorToolbarKeylineHeight}px 0 0 ${colors.N30}`
        : 'none'
    }
    paddingX={32}
    transition="box-shadow 200ms"
    zIndex={akEditorMenuZIndex}
    display="flex"
    height={80}
    flexShrink={0}
    css={{ '& object': { height: '0 !important' } }}
    {...props}
  >
    {children}
  </Box>
)
MainToolbar.displayName = 'MainToolbar'

const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar'

const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  padding: 24px 0;
`
SecondaryToolbar.displayName = 'SecondaryToolbar'

export default class Editor extends React.Component<
  EditorAppearanceComponentProps,
  any
> {
  state = { showKeyline: false }

  static displayName = 'FullPageEditor'
  private appearance: EditorAppearance = 'full-page'
  private scrollContainer: HTMLElement | undefined
  private scheduledKeylineUpdate: number | undefined

  stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation()

  scrollContainerRef = (ref: HTMLElement | null) => {
    const previousScrollContainer = this.scrollContainer

    // remove existing handler
    if (previousScrollContainer) {
      previousScrollContainer.removeEventListener(
        'scroll',
        this.scheduleUpdateToolbarKeyline
      )
    }

    this.scrollContainer = ref ? ref : undefined

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener(
        'scroll',
        this.scheduleUpdateToolbarKeyline,
        false
      )
      this.updateToolbarKeyline()
    }
  }

  updateToolbarKeyline = () => {
    if (!this.scrollContainer) {
      return false
    }

    const { scrollTop } = this.scrollContainer
    this.setState({ showKeyline: scrollTop > akEditorToolbarKeylineHeight })

    return false
  }

  private scheduleUpdateToolbarKeyline = rafSchedule(this.updateToolbarKeyline)

  componentDidMount() {
    window.addEventListener('resize', this.scheduleUpdateToolbarKeyline, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scheduleUpdateToolbarKeyline)

    if (this.scheduledKeylineUpdate) {
      cancelAnimationFrame(this.scheduledKeylineUpdate)
    }
  }

  render() {
    const {
      editorDOMElement,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      primaryToolbarComponents,
      contentComponents,
      customPrimaryToolbarComponents,
      customContentComponents,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      disabled,
      collabEdit,
      containerProps,
      toolbarProps,
      ...props
    } = this.props

    const { showKeyline } = this.state

    return (
      <Box
        minWidth={340}
        height="100%"
        display="flex"
        flexDirection="column"
        boxSizing="border-box"
        className="akEditor"
        {...props}
      >
        <MainToolbar showKeyline={showKeyline} {...toolbarProps}>
          <Toolbar
            editorView={editorView!}
            editorActions={editorActions}
            eventDispatcher={eventDispatcher!}
            providerFactory={providerFactory}
            appearance={this.appearance}
            items={primaryToolbarComponents}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            popupsScrollableElement={popupsScrollableElement}
            disabled={!!disabled}
          />
          <MainToolbarCustomComponentsSlot>
            <Avatars
              editorView={editorView}
              eventDispatcher={eventDispatcher}
              inviteToEditHandler={collabEdit && collabEdit.inviteToEditHandler}
              isInviteToEditButtonSelected={
                collabEdit && collabEdit.isInviteToEditButtonSelected
              }
            />
            {customPrimaryToolbarComponents}
          </MainToolbarCustomComponentsSlot>
        </MainToolbar>
        <ScrollContainer
          innerRef={this.scrollContainerRef}
          className="fabric-editor-popup-scroll-parent"
        >
          <ClickAreaBlock editorView={editorView}>
            <ContentArea {...containerProps}>
              <div className="ak-editor-content-area">
                {customContentComponents}
                {
                  <PluginSlot
                    editorView={editorView}
                    editorActions={editorActions}
                    eventDispatcher={eventDispatcher}
                    providerFactory={providerFactory}
                    appearance={this.appearance}
                    items={contentComponents}
                    popupsMountPoint={popupsMountPoint}
                    popupsBoundariesElement={popupsBoundariesElement}
                    popupsScrollableElement={popupsScrollableElement}
                    disabled={!!disabled}
                    containerElement={this.scrollContainer}
                  />
                }
                {editorDOMElement}
              </div>
            </ContentArea>
          </ClickAreaBlock>
        </ScrollContainer>
        <WidthEmitter
          editorView={editorView!}
          contentArea={this.scrollContainer}
        />
      </Box>
    )
  }
}
