import Box, { BoxProps } from '@parishconnect/box'
import * as React from 'react'
import { Overwrite } from 'utility-types'
import { ThemeContext } from '../../theme'
import { Text } from '../../typography'
import { css } from '@emotion/core'

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
  ':first-of-type': {
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999
  },
  ':last-of-type': {
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
  border: 0,
  clip: 'rect(0 0 0 0)'
})

export interface SegmentedControlRadioProps {
  /**
   * The name attribute of the radio input.
   */
  name: string

  /**
   * The label used for the radio.
   */
  label: React.ReactNode

  /**
   * The value attribute of the radio input.
   */
  value: any

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
  onChange?: any
}

class SegmentedControlRadio extends React.PureComponent<
  Overwrite<BoxProps, SegmentedControlRadioProps>
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
      onChange,
      appearance,
      isFirstItem,
      isLastItem,
      css
    } = this.props
    const theme = this.context

    const themedCSS = theme.getSegmentedControlRadioCSS(
      theme.themeColor || appearance
    )
    const textSize = theme.getTextSizeForControlHeight(height)

    return (
      <Box
        css={[wrapperClass, themedCSS, css]}
        data-active={checked}
        {...(isFirstItem
          ? {
              marginLeft: -10
            }
          : {})}
        {...(isLastItem
          ? {
              marginRight: -10
            }
          : {})}
      >
        <Box
          is="input"
          type="radio"
          id={id}
          css={offscreenCss}
          name={name}
          value={value}
          checked={checked}
          onChange={e => onChange(e.target.value)}
        />
        <Text
          borderRadius={50}
          is="label"
          cursor="pointer"
          htmlFor={id}
          fontWeight={700}
          size={textSize}
          css={labelClass as any}
        >
          {label}
        </Text>
      </Box>
    )
  }
}

export default SegmentedControlRadio
