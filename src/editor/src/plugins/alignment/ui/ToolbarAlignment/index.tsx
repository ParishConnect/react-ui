import * as React from 'react'
import { defineMessages } from 'react-intl'
import ToolbarButton from '../../../../ui/ToolbarButton'
import Dropdown from '../../../../ui/Dropdown'

export const iconMap = {
  start: AlignLeftIcon,
  end: AlignRightIcon,
  center: AlignCenterIcon
}

import { TriggerWrapper, Separator, Wrapper } from './styles'
import Alignment from '../../../../ui/Alignment'
import { AlignmentPluginState, AlignmentState } from '../../pm-plugins/main'
import {
  ChevronDownIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon
} from '../../../../../../icons/index'

export const messages = defineMessages({
  alignment: {
    id: 'fabric.editor.alignment',
    defaultMessage: 'Alignment',
    description: 'Aligns text'
  }
})

export interface State {
  isOpen: boolean
}

export interface Props {
  pluginState: AlignmentPluginState
  changeAlignment: (align: AlignmentState) => void
  popupsMountPoint?: HTMLElement
  popupsBoundariesElement?: HTMLElement
  popupsScrollableElement?: HTMLElement
  isReducedSpacing?: boolean
  disabled?: boolean
}

class AlignmentToolbar extends React.Component<Props, State> {
  state: State = {
    isOpen: false
  }

  render() {
    const { isOpen } = this.state
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      pluginState,
      disabled
    } = this.props

    return (
      <Wrapper>
        <Dropdown
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          isOpen={this.state.isOpen}
          onOpenChange={this.handleOpenChange}
          fitWidth={285}
          fitHeight={80}
          trigger={
            <ToolbarButton
              disabled={disabled}
              selected={isOpen}
              title="Text alignment"
              onClick={this.toggleOpen}
              iconBefore={() => {
                const CurrIcon = iconMap[pluginState.align]
                return (
                  <TriggerWrapper>
                    <CurrIcon />
                    <ChevronDownIcon />
                  </TriggerWrapper>
                )
              }}
            />
          }
        >
          <Alignment
            onClick={align => this.changeAlignment(align)}
            selectedAlignment={pluginState.align}
          />
        </Dropdown>
        <Separator />
      </Wrapper>
    )
  }

  private changeAlignment = align => {
    this.toggleOpen()
    return this.props.changeAlignment(align)
  }

  private toggleOpen = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen })
  }

  private handleOpenChange = ({ isOpen }) => {
    this.setState({ isOpen })
  }
}

export default AlignmentToolbar
