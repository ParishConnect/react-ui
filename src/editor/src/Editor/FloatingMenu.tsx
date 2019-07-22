import {
  bubblePositioner,
  InjectedRemirrorProps,
  withRemirror
} from '@remirror/react'
import * as React from 'react'
import { IconButton } from '../../../buttons/index'
import { BoldIcon, ItalicIcon, UnderlineIcon } from '../../../icons/index'
import { Card } from '../../../layers/index'
import { majorScale, minorScale } from '../../../scales/index'
import { runAction } from './utils/runAction'

class FloatingMenu extends React.Component<InjectedRemirrorProps> {
  render() {
    const { getPositionerProps, actions } = this.props // Pull in injected props from context

    const props = getPositionerProps({
      positionerId: 'bubble',
      ...bubblePositioner
    })
    return (
      <Card
        elevation={2}
        appearance="white"
        display="flex"
        padding={minorScale(1)}
        position="absolute"
        bottom={props.isActive ? props.bottom + majorScale(1) : -9999}
        left={props.isActive ? props.left : -9999}
        transform="translateX(-50%)"
        innerRef={props.ref}
      >
        <IconButton
          marginRight={2}
          appearance="minimal"
          isActive={actions.bold.isActive()}
          disabled={!actions.bold.isEnabled()}
          onClick={runAction(actions.bold)}
          icon={BoldIcon}
        />
        <IconButton
          marginRight={2}
          appearance="minimal"
          isActive={actions.italic.isActive()}
          disabled={!actions.italic.isEnabled()}
          onClick={runAction(actions.italic)}
          icon={ItalicIcon}
        />
        <IconButton
          appearance="minimal"
          isActive={actions.underline.isActive()}
          disabled={!actions.underline.isEnabled()}
          onClick={runAction(actions.underline)}
          icon={UnderlineIcon}
        />
      </Card>
    )
  }
}

export default withRemirror(FloatingMenu)
