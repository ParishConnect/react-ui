import * as React from 'react'
import Button, { ButtonProps } from './Button'
import { ArrowLeftCircleIcon } from '../../icons/index'

export default class BackButton extends React.PureComponent<ButtonProps> {
  static defaultProps = {
    /**
     * Composes the Button component as the base.
     */
    ...Button.defaultProps,

    children: 'Back'
  }

  render() {
    return <Button iconBefore={ArrowLeftCircleIcon} {...this.props as any} />
  }
}
