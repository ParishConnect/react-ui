import * as React from 'react'
import { StackingOrder } from '../../constants'
import StackingContext from './StackingContext'

export interface StackProps {
  value: number
  children: React.ReactNode | any
}

export default class Stack extends React.PureComponent<StackProps> {
  static defaultProps = {
    value: StackingOrder.STACKING_CONTEXT
  }

  render() {
    const { children, value } = this.props
    return (
      <StackingContext.Consumer>
        {previousValue => {
          const currentValue = Math.max(value, previousValue)
          const nextValue = currentValue + 1
          return (
            <StackingContext.Provider value={nextValue}>
              {children(currentValue)}
            </StackingContext.Provider>
          )
        }}
      </StackingContext.Consumer>
    )
  }
}
