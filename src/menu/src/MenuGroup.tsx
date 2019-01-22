import * as React from 'react'
import { Pane } from '../../layers'
import { Heading } from '../../typography'

export interface MenuGroupProps {
  /**
   * Title of the menu group.
   */
  title?: React.ReactNode
}

export default class MenuGroup extends React.PureComponent<MenuGroupProps> {
  render() {
    const { title, children } = this.props
    return (
      <Pane paddingY={8}>
        {title && (
          <Heading size={100} marginX={16} marginY={8}>
            {title}
          </Heading>
        )}
        {children}
      </Pane>
    )
  }
}
