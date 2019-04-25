import {
  bubblePositioner,
  defaultPositioner,
  InjectedRemirrorProps,
  withRemirror
} from '@remirror/react'
import * as React from 'react'
import { IconButton } from '../../../buttons/index'
import {
  ActivityIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  TerminalIcon,
  TrashIcon
} from '../../../icons/index'
import { Card, Pane } from '../../../layers/index'
import { Popover } from '../../../popover/index'
import { minorScale } from '../../../scales/index'
import { runAction } from './utils/runAction'
import { findSelectedNodeOfType } from 'prosemirror-utils'

interface ImageManagerProps extends InjectedRemirrorProps {}

export default withRemirror(
  class ImageManager extends React.Component<ImageManagerProps> {
    render() {
      const { actions, state, view } = this.props // Pull in injected props from context

      const isActive = findSelectedNodeOfType(
        state.newState.schema.nodes.image
      )(state.newState.selection)

      return (
        <Popover
          position="bottom"
          statelessProps={{ minWidth: 64 }}
          isShown={isActive ? true : false}
          content={
            <Card
              elevation={2}
              appearance="white"
              display="flex"
              alignItems="center"
              padding={minorScale(1)}
              zIndex={9999}
            >
              <IconButton
                appearance="minimal"
                onClick={runAction(actions.imageUpdate.command, {
                  layout: 'align-start'
                })}
                icon={AlignLeftIcon}
              />
              <IconButton
                appearance="minimal"
                onClick={runAction(actions.imageUpdate.command, {
                  layout: 'center'
                })}
                icon={AlignCenterIcon}
              />
              <IconButton
                appearance="minimal"
                onClick={runAction(actions.imageUpdate.command, {
                  layout: 'align-end'
                })}
                icon={AlignRightIcon}
              />
              <Pane
                marginRight={minorScale(1)}
                paddingLeft={minorScale(1)}
                height={24}
                borderRight="muted"
              />
              <IconButton
                appearance="minimal"
                onClick={runAction(actions.imageUpdate.command, {
                  layout: 'wrap-start'
                })}
                icon={TerminalIcon}
              />
              <IconButton
                appearance="minimal"
                onClick={runAction(actions.imageUpdate.command, {
                  layout: 'wrap-end'
                })}
                icon={TerminalIcon}
              />
              <Pane
                marginRight={minorScale(1)}
                paddingLeft={minorScale(1)}
                height={24}
                borderRight="muted"
              />
              <IconButton
                appearance="minimal"
                onClick={runAction(actions.imageRemove.command)}
                intent="danger"
                icon={TrashIcon}
              />
            </Card>
          }
        >
          {({ getRef }) => {
            const target = view.nodeDOM(state.newState.selection.anchor)
            return getRef(target)
          }}
        </Popover>
      )
    }
  }
)
