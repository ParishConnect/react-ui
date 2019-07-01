import * as React from 'react'
import { ThemeContext } from '../../theme'
import { Text } from '../../typography'
import { TextProps } from '../../typography/src/Text'
import warning from '../../lib/warning'

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

  /**
   * Optionally disable the tab
   */
  disabled?: boolean
}

class Tab extends React.PureComponent<TabProps> {
  static contextType = ThemeContext

  static defaultProps = {
    onSelect: () => {},
    onKeyPress: () => {},
    is: 'span',
    height: 32,
    disabled: false
  }

  static styles = {
    display: 'inline-flex',
    fontWeight: 500,
    paddingX: 12,
    marginX: 4,
    borderRadius: 8,
    lineHeight: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    tabIndex: 0
  }

  handleClick = (e: any) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e)
    }
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
    const {
      is,
      height,
      onSelect,
      isSelected,
      appearance,
      disabled,
      ...props
    } = this.props
    const theme = this.context

    if (process.env.NODE_ENV !== 'production') {
      warning(
        typeof this.props.onClick === 'function',
        '<Tab> expects `onSelect` prop, but you passed `onClick`.'
      )
    }

    const textSize = theme.getTextSizeForControlHeight(height) + 100

    let elementBasedProps: any
    if (disabled) {
      elementBasedProps = {
        'aria-disabled': true
      }
    }
    if (is === 'a') {
      // Use aria-current when it's a link https://tink.uk/using-the-aria-current-attribute/
      elementBasedProps = isSelected
        ? {
            ...elementBasedProps,
            'aria-current': 'page'
          }
        : {}
    } else {
      // Use a role="tablist" around the tabs
      // Also pass down a aria-controls="panelId" https://www.stefanjudis.com/blog/aria-selected-and-when-to-use-it/
      elementBasedProps = {
        ...elementBasedProps,
        'aria-selected': isSelected,
        role: 'tab'
      }
    }

    return (
      <Text
        className={theme.getTabClassName(theme.themeColor)}
        is={is}
        size={textSize}
        height={height}
        {...Tab.styles}
        {...(props as any)}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        {...elementBasedProps}
      />
    )
  }
}

export default Tab
