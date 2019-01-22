import * as React from 'react'
import fuzzaldrin from 'fuzzaldrin-plus'
import Downshift, { DownshiftInterface } from 'downshift'
import VirtualList, {
  ScrollAlignment
} from '@hennessyevan/react-tiny-virtual-list'
import { Popover } from '../../popover'
import { Position, PositionType } from '../../constants'
import { Heading } from '../../typography'
import { Pane, PaneProps } from '../../layers'
import AutocompleteItem from './AutocompleteItem'
import { Assign } from 'utility-types'

const fuzzyFilter = (items: {}[], input: string) =>
  fuzzaldrin.filter(items, input)

const autocompleteItemRenderer = (props: any) => <AutocompleteItem {...props} />

export interface AutocompleteProps
  extends Assign<PaneProps, DownshiftInterface> {
  children?: any
  position?: PositionType
  /**
   * This prop can be either a string or a Node.
   * It will provide a title for the items
   */
  title?: string | React.ReactNode
  /**
   * An array of items to be used as options for the select
   */
  items: any[]
  /**
   * The selected Item to be shown on the autocomplete
   */
  selectedItem?: any
  /**
   * The selected item to be selected & shown by default on the autocomplete
   */
  defaultSelectedItem?: any
  /**
   * The height of each item in the list
   * Because the list is virtualized this is required beforehand.
   */
  itemSize?: number

  /**
   * Prop that enables and disables filtering
   * True: Enables Filtering
   * False: Disables Filtering
   */
  isFilterDisabled?: boolean
  /**
   * Defines the minimum height the results container will be
   */
  popoverMinWidth?: number
  /**
   * Defines the maximum height the results container will be
   */
  popoverMaxHeight?: number
  /**
   * In case the array of items is not an array of strings,
   * this function is used on each item to return the string that will be shown on the filter
   */
  itemToString?(item: any): any
  /**
   * Function that returns a component to render the item
   */
  renderItem?(item: any): React.ReactNode | any
  /**
   * A function that is used to filter the items.
   * It should return a subset of the initial items.
   * By default the "fuzzaldrin-plus" package is used.
   */
  itemsFilter?(items: [], input: any): never[]
}

export interface AutocompleteState {
  targetWidth: number
}

// Issue still exists: https://github.com/paypal/downshift/issues/164
export default class Autocomplete extends React.PureComponent<
  AutocompleteProps,
  AutocompleteState
> {
  public static defaultProps = {
    itemToString: (i: any) => (i ? String(i) : ''),
    itemSize: 32,
    itemsFilter: fuzzyFilter,
    isFilterDisabled: false,
    popoverMinWidth: 240,
    popoverMaxHeight: 240,
    renderItem: autocompleteItemRenderer
  }

  targetRef: HTMLElement

  state: AutocompleteState = {
    targetWidth: 0
  }

  componentDidMount() {
    this.setState({
      targetWidth: this.targetRef.getBoundingClientRect().width
    })
  }

  renderResults = ({
    width,
    inputValue,
    highlightedIndex,
    selectItemAtIndex,
    selectedItem,
    getItemProps
  }: any) => {
    const {
      title,
      itemSize = 32,
      itemsFilter = fuzzyFilter,
      items: originalItems,
      itemToString = (i: any) => (i ? String(i) : ''),
      renderItem = autocompleteItemRenderer,
      popoverMaxHeight = 240,
      isFilterDisabled = false
    } = this.props

    const items =
      isFilterDisabled || inputValue.trim() === ''
        ? originalItems
        : itemsFilter(originalItems, inputValue)

    if (items.length === 0) return null

    return (
      <Pane width={width}>
        {title && (
          <Pane padding={8} borderBottom="muted">
            <Heading size={100}>{title}</Heading>
          </Pane>
        )}
        {items.length > 0 && (
          <VirtualList
            width="100%"
            height={Math.min(items.length * itemSize, popoverMaxHeight)}
            itemSize={itemSize}
            itemCount={items.length}
            scrollToIndex={highlightedIndex || 0}
            overscanCount={3}
            scrollToAlignment={ScrollAlignment.AUTO}
            renderItem={({ index, style }) => {
              const item = items[index]
              const itemString = itemToString(item)
              return renderItem(
                getItemProps({
                  item,
                  key: itemString,
                  index,
                  style,
                  children: itemString,
                  onMouseUp: () => {
                    selectItemAtIndex(index)
                  },
                  isSelected: itemToString(selectedItem) === itemString,
                  isHighlighted: highlightedIndex === index
                })
              )
            }}
          />
        )}
      </Pane>
    )
  }

  render() {
    const {
      children,
      position,
      popoverMinWidth = 240,
      defaultSelectedItem,
      ...props
    } = this.props

    return (
      <Downshift defaultSelectedItem={defaultSelectedItem} {...props}>
        {({
          isOpen: isShown,
          inputValue,
          getItemProps,
          selectedItem,
          highlightedIndex,
          selectItemAtIndex,
          ...restDownshiftProps
        }) => (
          <div>
            <Popover
              bringFocusInside={false}
              isShown={isShown}
              minWidth={popoverMinWidth}
              position={
                position ||
                (this.state.targetWidth < popoverMinWidth
                  ? Position.BOTTOM_LEFT
                  : Position.BOTTOM)
              }
              content={() => {
                return this.renderResults({
                  width: Math.max(this.state.targetWidth, popoverMinWidth),
                  inputValue,
                  getItemProps,
                  selectedItem,
                  highlightedIndex,
                  selectItemAtIndex
                })
              }}
              minHeight={0}
              animationDuration={0}
            >
              {({ isShown: isShownPopover, toggle, getRef }: any) =>
                children({
                  isShown: isShownPopover,
                  toggle,
                  getRef: ref => {
                    // Use the ref internally to determine the width
                    this.targetRef = ref
                    getRef(ref)
                  },
                  inputValue,
                  selectedItem,
                  highlightedIndex,
                  selectItemAtIndex,
                  ...restDownshiftProps
                })
              }
            </Popover>
          </div>
        )}
      </Downshift>
    )
  }
}
