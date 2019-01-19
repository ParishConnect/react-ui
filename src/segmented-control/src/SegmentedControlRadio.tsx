import * as React from 'react'
import { Omit } from 'utility-types'
import { noop } from 'lodash'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { css } from 'glamor'
import cx from 'classnames'
import { Text } from '../../typography'
import { ThemeContext } from '../../theme'

const labelClass = css({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

const wrapperClass = css({
  position: 'relative',
  display: 'flex',
  flex: 1,
  cursor: 'pointer',
  marginLeft: '-1px',
  [`:first-child`]: {
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999
  },
  [`:last-child`]: {
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999
  }
})

const offscreenCss = css({
  overflow: 'hidden',
  position: 'absolute',
  height: '1px',
  width: '1px',
  padding: 0,
  margin: '-1px',
  border: 0,
  clip: 'rect(0 0 0 0)'
})

export interface SegmentedControlRadioProps
  extends Omit<BoxProps, 'appearance'> {
  /**
   * The name attribute of the radio input.
   */
  name: string

  /**
   * The label used for the radio.
   */
  label: React.ReactChild

  /**
   * The value attribute of the radio input.
   */
  value: string

  /**
   * The height of the control.
   */
  height: number

  /**
   * When true, the radio input is checked.
   */
  checked: boolean

  /**
   * The appearance of the control. Currently only `default` is possible.
   */
  appearance: string

  /**
   * When true, this item is the first item.
   */
  isFirstItem?: boolean

  /**
   * When true, this item is the last item.
   */
  isLastItem?: boolean

  /**
   * The unique id of the radio option.
   */
  id?: string

  /**
   * Function called when the state changes.
   */
  onChange?(value?: string | number | boolean): any
}

class SegmentedControlRadio extends React.PureComponent<
  SegmentedControlRadioProps
> {
  public static contextType = ThemeContext

  render() {
    const {
      id,
      name,
      label,
      value,
      height,
      checked,
      onChange = noop,
      appearance,
      isFirstItem,
      isLastItem
    } = this.props
    const theme = this.context

    const themedClassName = theme.getSegmentedControlRadioClassName(
      theme.themeColor || appearance
    )
    const textSize = theme.getTextSizeForControlHeight(height)
    const borderRadius = theme.getBorderRadiusForControlHeight(height)

    return (
      <Box
        className={cx(wrapperClass.toString(), themedClassName)}
        data-active={checked}
        {...(isFirstItem
          ? {
              borderTopLeftRadius: borderRadius,
              borderBottomLeftRadius: borderRadius
            }
          : {})}
        {...(isLastItem
          ? {
              borderTopRightRadius: borderRadius,
              borderBottomRightRadius: borderRadius
            }
          : {})}
      >
        <input
          type="radio"
          id={id}
          className={`${offscreenCss}`}
          name={name}
          value={value}
          checked={checked}
          // tslint:disable:jsx-no-lambda
          // tslint:disable-next-line:react-this-binding-issue
          onChange={e => onChange(e.target.value!)}
        />
        <Text
          is="label"
          cursor="pointer"
          htmlFor={id}
          fontWeight={700}
          size={textSize}
          className={`${labelClass}`}
        >
          {label}
        </Text>
      </Box>
    )
  }
}

export default SegmentedControlRadio
