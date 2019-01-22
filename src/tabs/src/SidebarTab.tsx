import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import Tab, { TabProps } from './Tab'

export default class SidebarTab extends React.PureComponent<TabProps> {
  static defaultProps = {
    height: 32
  }

  static styles = {
    width: '100%',
    paddingX: 0,
    paddingLeft: 10,
    marginX: 0,
    marginBottom: 4,
    justifyContent: 'auto'
  }

  render() {
    const { children, height = 32, isSelected, ...props } = this.props
    return (
      <Tab
        isSelected={isSelected}
        height={height}
        {...SidebarTab.styles}
        {...props}
      >
        <Box is="span" flex="1">
          {children}
        </Box>
      </Tab>
    )
  }
}
