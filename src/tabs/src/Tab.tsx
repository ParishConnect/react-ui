import * as React from 'react'
import { noop } from 'lodash'
import { Text } from '../../typography'
import { TextProps } from '../../typography/src/Text'
import { ThemeContext } from '../../theme'
import { splitBoxProps } from '@hennessyevan/aluminum-box'

export interface TabProps extends TextProps {
  /**
   * Function triggered when tab is selected.
   */
  onSelect?: any

  /**
   * When true, the tab is selected.
   */
  isSelected?: boolean

  /**
   * The appearance of the tab.
   * The default theme only comes with a default style.
   */
  appearance?: string
}

class Tab extends React.PureComponent<TabProps> {
  static contextType = ThemeContext

  static defaultProps = {
    onClick: noop,
    onSelect: noop,
    onKeyPress: noop,
    is: 'span',
    height: 32
  }

  static styles = {
    display: 'inline-flex',
    fontWeight: 700,
    paddingX: 12,
    marginX: 4,
    borderRadius: 6,
    lineHeight: '28px',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    tabIndex: 0
  }

  handleClick = (e: any) => {
    this.props.onClick(e)
    this.props.onSelect()
  }

  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.props.onSelect()
      e.preventDefault()
    }
    this.props.onKeyPress(e)
  }

  render() {
    // tslint:disable:no-unused
    const {
      is,
      height,
      onSelect,
      isSelected,
      appearance,
      ...props
    } = this.props
    const theme = this.context
    // tslint:enable:no-unused

    const textSize = theme.getTextSizeForControlHeight(height) * 1.3

    let elementBasedProps: any
    if (is === 'a') {
      // Use aria-current when it's a link https://tink.uk/using-the-aria-current-attribute/
      elementBasedProps = isSelected
        ? {
            'aria-current': 'page'
          }
        : {}
    } else {
      // Use a role="tablist" around the tabs
      // Also pass down a aria-controls="panelId" https://www.stefanjudis.com/blog/aria-selected-and-when-to-use-it/
      elementBasedProps = {
        'aria-selected': isSelected,
        role: 'tab'
      }
    }

    const { matchedProps } = splitBoxProps(props)

    return (
      <Text
        className={theme.getTabClassName(theme.themeColor)}
        is={is}
        size={textSize}
        height={height}
        {...Tab.styles}
        {...matchedProps}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        {...elementBasedProps}
      />
    )
  }
}

export default Tab
