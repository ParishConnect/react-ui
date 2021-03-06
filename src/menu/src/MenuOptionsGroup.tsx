import * as React from 'react'
import { Pane } from '../../layers'
import { Heading } from '../../typography'
import { ThemeContext } from '../../theme'
import MenuOption from './MenuOption'

export interface MenuOptionsGroupProps {
  /**
   * Title of the menu group.
   */
  title?: React.ReactNode

  /**
   * The current value of the option group.
   */
  selected?: number | string

  /**
   * Function called when selection changes.
   */
  onChange?: any

  /**
   * List of options rendered in the group.
   */
  options?: any[]
}

class MenuOptionsGroup extends React.PureComponent<MenuOptionsGroupProps> {
  static contextType = ThemeContext

  render() {
    const { title, options = [], selected, onChange } = this.props

    return (
      <Pane paddingY={8}>
        {title && (
          <Heading size={100} marginLeft={44} marginRight={16} marginY={8}>
            {title}
          </Heading>
        )}
        <Pane>
          {options.map(option => {
            return (
              <MenuOption
                key={option.value}
                isSelected={option.value === selected}
                onSelect={() => onChange(option.value)}
              >
                {option.label}
              </MenuOption>
            )
          })}
        </Pane>
      </Pane>
    )
  }
}

export default MenuOptionsGroup
