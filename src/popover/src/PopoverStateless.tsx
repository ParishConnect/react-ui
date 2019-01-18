import * as React from 'react'
import { Card, PaneProps } from '../../layers'

export default class PopoverStateless extends React.PureComponent<PaneProps> {
  render() {
    const { children, ...props } = this.props

    return (
      <Card
        role="dialog"
        elevation={3}
        overflow="hidden"
        position="fixed"
        minWidth={200}
        backgroundColor="white"
        {...props}
      >
        {children}
      </Card>
    )
  }
}
