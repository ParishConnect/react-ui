import * as React from 'react'
import { Pane, PaneProps } from '../../layers'
import ScrollbarSize from './ScrollbarSize'

export interface TableHeadProps extends PaneProps {
  /**
   * The height of the table head.
   */
  height?: number
  /**
   * This should always be true if you are using TableHead together with a TableBody.
   * Because TableBody has `overflowY: scroll` by default.
   */
  accountForScrollbar?: boolean
}

interface TableHeadState {
  scrollbarWidth: number
}

export default class TableHead extends React.PureComponent<
  TableHeadProps,
  TableHeadState
> {
  static defaultProps = {
    height: 32,
    accountForScrollbar: true
  }
  state: TableHeadState = {
    scrollbarWidth: 0
  }

  handleScrollbarSize = (width: number) => {
    this.setState({
      scrollbarWidth: width
    })
  }

  render() {
    const {
      children,
      height = 32,
      accountForScrollbar = true,
      ...props
    } = this.props
    const { scrollbarWidth } = this.state

    return (
      <Pane
        display="flex"
        flexShrink={0}
        paddingRight={scrollbarWidth}
        borderBottom="default"
        background="tint2"
        height={height}
        {...props}
      >
        {children}{' '}
        {accountForScrollbar && (
          <ScrollbarSize handleScrollbarSize={this.handleScrollbarSize} />
        )}
      </Pane>
    )
  }
}
