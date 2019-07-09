import * as React from 'react'

export interface ScrollbarSizeProps {
  /**
   * Returns the size of the scrollbar by creating a hidden fixed div.
   */
  handleScrollbarSize?: any
}

interface ScrollbarSizeState {
  innerWidth: number | null
  outerWidth: number | null
}

export default class ScrollbarSize extends React.PureComponent<
  ScrollbarSizeProps,
  ScrollbarSizeState
> {
  static defaultProps = {
    handleScrollbarSize: () => {}
  }

  innerRef: any
  outerRef: any

  state: ScrollbarSizeState = {
    innerWidth: null,
    outerWidth: null
  }

  componentDidMount() {
    const innerWidth = this.innerRef.getBoundingClientRect().width
    const outerWidth = this.outerRef.getBoundingClientRect().width
    this.setState({
      innerWidth,
      outerWidth
    })
  }

  componentWillUpdate(_: ScrollbarSizeProps, nextState: ScrollbarSizeState) {
    if (nextState.innerWidth && nextState.outerWidth) {
      this.props.handleScrollbarSize(
        nextState.outerWidth - nextState.innerWidth
      )
    }
  }

  handleOuterRef = (ref: any) => {
    this.outerRef = ref
  }

  handleInnerRef = (ref: any) => {
    this.innerRef = ref
  }

  render() {
    return (
      <div
        ref={this.handleOuterRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: -500,
          left: -500,
          width: 100,
          overflowY: 'scroll'
        }}
      >
        <div ref={this.handleInnerRef} />
      </div>
    )
  }
}
