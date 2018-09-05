import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from '../../typography'
import { withTheme } from '../../theme'

class Tab extends PureComponent {
  static propTypes = {
    /**
     * Composes the Text component as the base.
     */
    ...Text.propTypes,

    /**
     * Function triggered when tab is selected.
     */
    onSelect: PropTypes.func,

    /**
     * When true, the tab is selected.
     */
    isSelected: PropTypes.bool,

    /**
     * The appearance of the tab.
     * The default theme only comes with a default style.
     */
    appearance: PropTypes.string,

    /**
     * Theme provided by ThemeProvider.
     */
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    onClick: () => {},
    onSelect: () => {},
    onKeyPress: () => {},
    is: 'span',
    height: 28
  }

  static styles = {
    display: 'inline-flex',
    fontWeight: 700,
    paddingX: 12,
    marginX: 4,
    borderRadius: 3,
    lineHeight: '28px',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    tabIndex: 0
  }

  handleClick = e => {
    this.props.onClick(e)
    this.props.onSelect()
  }

  handleKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.props.onSelect()
      e.preventDefault()
    }
    this.props.onKeyPress(e)
  }

  render() {
    const {
      theme,
      is,
      height,
      onSelect,
      isSelected,
      appearance = 'blue',
      ...props
    } = this.props

    const textSize = theme.getTextSizeForControlHeight(height) * 1.3

    let elementBasedProps
    if (is === 'a') {
      // Use aria-current when it's a link
      // https://tink.uk/using-the-aria-current-attribute/
      elementBasedProps = isSelected
        ? {
            'aria-current': 'page'
          }
        : {}
    } else {
      // Use a role="tablist" around the tabs
      // Also pass down a aria-controls="panelId"
      // https://www.stefanjudis.com/blog/aria-selected-and-when-to-use-it/
      elementBasedProps = {
        'aria-selected': isSelected,
        role: 'tab'
      }
    }

    return (
      <Text
        className={theme.getTabClassName(appearance)}
        is={is}
        size={textSize}
        height={height}
        {...Tab.styles}
        {...props}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        {...elementBasedProps}
      />
    )
  }
}

export default withTheme(Tab)
