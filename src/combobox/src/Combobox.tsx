import * as React from 'react'
import Box, { BoxProps } from '@hennessyevan/aluminum-box'
import { Autocomplete } from '../../autocomplete'
import { TextInput } from '../../text-input'
import { IconButton } from '../../buttons'

export interface ComboboxProps extends BoxProps {
  /**
   * The options to show in the menu.
   */
  items: any[]

  /**
   * The selected item when controlled.
   */
  selectedItem?: any

  /**
   * Function called when value changes.
   */
  onChange?: any

  /**
   * When true, open the autocomplete on focus.
   */
  openOnFocus?: boolean

  /**
   * Default selected item when uncontrolled.
   */
  defaultSelectedItem?: any

  /**
   * The placeholder text when there is no value present.
   */
  placeholder?: string

  /**
   * In case the array of items is not an array of strings,
   * this function is used on each item to return the string that will be shown on the filter
   */
  itemToString?: any

  /**
   * Properties forwarded to the input. Use with caution.
   */
  inputProps?: object

  /**
   * Properties forwarded to the button. Use with caution.
   */
  buttonProps?: object

  /**
   * Properties forwarded to the autocomplete component. Use with caution.
   */
  autocompleteProps?: object
}

export interface ComboboxState {
  isOpenedByButton: boolean
}

export default class Combobox extends React.PureComponent<
  ComboboxProps,
  ComboboxState
> {
  static defaultProps = {
    width: 240,
    openOnFocus: false
  }

  state: ComboboxState = {
    isOpenedByButton: false
  }

  handleStateChange = (changes: any) => {
    if (
      Object.prototype.hasOwnProperty.call(changes, 'isOpen') &&
      !changes.isOpen
    ) {
      this.setState({ isOpenedByButton: false })
    }
  }

  render() {
    const {
      items,
      selectedItem,
      defaultSelectedItem,
      itemToString,
      width,
      height,
      onChange,
      placeholder,
      inputProps,
      buttonProps,
      openOnFocus,
      autocompleteProps,
      ...props
    } = this.props

    return (
      <Autocomplete
        items={items}
        selectedItem={selectedItem}
        defaultSelectedItem={defaultSelectedItem}
        itemToString={itemToString}
        onChange={onChange}
        onStateChange={this.handleStateChange}
        isFilterDisabled={this.state.isOpenedByButton}
        {...autocompleteProps}
      >
        {({
          getRef,
          isShown,
          openMenu,
          inputValue,
          getInputProps,
          getButtonProps,
          clearSelection
        }: any) => (
          <Box
            innerRef={ref => getRef(ref)}
            display="inline-flex"
            width={width}
            {...props}
          >
            <TextInput
              width={0}
              flex={1}
              height={height}
              value={inputValue}
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              {...getInputProps({
                ...inputProps,
                placeholder,
                onFocus: () => {
                  if (openOnFocus) openMenu()
                },
                onChange: e => {
                  if (this.state.isOpenedByButton) {
                    this.setState({
                      isOpenedByButton: false
                    })
                  }
                  if (e.target.value.trim() === '') {
                    // Prevent the selected item from sticking around
                    clearSelection()
                  }
                }
              })}
            />
            <IconButton
              iconAim="down"
              color="muted"
              icon="caret-down"
              appearance="default"
              height={height}
              marginLeft={-1}
              paddingLeft={0}
              paddingRight={0}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              {...getButtonProps({
                ...buttonProps,
                onClick: () => {
                  if (!isShown) {
                    this.setState({ isOpenedByButton: true })
                  }
                }
              })}
            />
          </Box>
        )}
      </Autocomplete>
    )
  }
}
