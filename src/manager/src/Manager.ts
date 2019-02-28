import * as React from 'react'

/**
 * This component is a utility component to manage state in stories and examples.
 */
export default class Manager extends React.Component<
  { children: any; [key: string]: any },
  any
> {
  state = {
    ...this.props
  }

  render() {
    return this.props.children({
      setState: (...args) => {
        this.setState({ ...args })
      },
      state: this.state
    })
  }
}
