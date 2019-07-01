import * as React from 'react'
import fuzzaldrin from 'fuzzaldrin-plus'
import VirtualList from 'react-tiny-virtual-list'
import { Pane } from '../../layers'
import { TableHead, SearchTableHeaderCell } from '../../table'
import OptionShapePropType from './OptionShapePropType'
import Option from './Option'

/**
 * Fuzzaldrin-plus is the default filter, but you can use your own
 * as long as they follow the following signature:
 * @param options <Array[String]> - ['label', 'label2', ...]
 * @param input <String>
 */
const fuzzyFilter = (options, input) => fuzzaldrin.filter(options, input)

/**
 * This is the default item renderer of options
 * you can pass custom renderers as long as they work the same as the Option
 */
const itemRenderer = props => <Option {...(props as any)} />

export interface OptionsListProps {
  options: OptionShapePropType[]
  close: any
  height: number
  width: number

  /**
   * When true, multi select is accounted for.
   */
  isMultiSelect: boolean

  /**
   * This holds the values of the options
   */
  selected: string[]
  onSelect: any
  onDeselect: any
  onFilterChange: any
  hasFilter: boolean
  optionSize: number
  renderItem: any
  filterPlaceholder: string
  filterIcon: string
  optionsFilter: any
  defaultSearchValue: string
  hasIcon: boolean
  virtualListProps: any
}

export interface OptionsListState {
  searchValue: string
  selected: string[]
}

export default class OptionsList extends React.PureComponent<
  OptionsListProps,
  OptionsListState
> {
  searchRef: any
  static defaultProps = {
    options: [],
    /**
     * Including border bottom
     * For some reason passing height to TableRow doesn't work
     * TODO: fix hacky solution
     */
    optionSize: 33,
    onSelect: () => {},
    onDeselect: () => {},
    onFilterChange: () => {},
    selected: [],
    renderItem: itemRenderer,
    optionsFilter: fuzzyFilter,
    filterPlaceholder: 'Filter...',
    filterIcon: 'search',
    defaultSearchValue: '',
    hasIcon: true
  }
  state: OptionsListState = {
    searchValue: this.props.defaultSearchValue,
    selected: this.props.selected
  }

  componentDidMount() {
    const { hasFilter } = this.props
    if (!hasFilter) return
    /**
     * Hacky solution for broken autoFocus
     * https://github.com/segmentio/evergreen/issues/90
     */
    requestAnimationFrame(() => {
      this.searchRef.querySelector('input').focus()
    })

    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        selected: this.props.selected
      })
    }
  }

  isSelected = item => {
    const { selected } = this.state

    return Boolean(selected.find(selectedItem => selectedItem === item.value))
  }

  search = options => {
    const { optionsFilter } = this.props
    const { searchValue } = this.state

    return searchValue.trim() === ''
      ? options // Return if no search query
      : optionsFilter(
          options.map(item => item.labelInList || item.label),
          searchValue
        ).map(name =>
          options.find(item => item.labelInList === name || item.label === name)
        )
  }

  getCurrentIndex = () => {
    const { selected } = this.props
    const options = this.getFilteredOptions()

    return options.findIndex(
      option => option.value === selected[selected.length - 1]
    )
  }

  getFilteredOptions() {
    const { options } = this.props

    return this.search(options)
  }

  handleKeyDown = e => {
    if (e.keyCode === 38) {
      this.handleArrowUp()
    }

    if (e.keyCode === 40) {
      this.handleArrowDown()
    }

    if (e.keyCode === 13) {
      this.handleEnter()
    }
  }

  handleArrowUp = () => {
    const { onSelect } = this.props
    const options = this.getFilteredOptions()

    let nextIndex = this.getCurrentIndex() - 1

    if (nextIndex < 0) {
      nextIndex = options.length - 1
    }

    onSelect(options[nextIndex])
  }

  handleArrowDown = () => {
    const { onSelect } = this.props
    const options = this.getFilteredOptions()

    let nextIndex = this.getCurrentIndex() + 1

    if (nextIndex === options.length) {
      nextIndex = 0
    }

    onSelect(options[nextIndex])
  }

  handleEnter = () => {
    const isSelected = this.getCurrentIndex() !== -1

    if (isSelected) {
      this.props.close()
    }
  }

  handleChange = searchValue => {
    this.setState({
      searchValue
    })
    this.props.onFilterChange(searchValue)
  }

  handleSelect = item => {
    this.props.onSelect(item)
  }

  handleDeselect = item => {
    this.props.onDeselect(item)
  }

  assignSearchRef = ref => {
    this.searchRef = ref
  }

  render() {
    const {
      options: originalOptions,
      close,
      width,
      height,
      onSelect,
      onDeselect,
      onFilterChange,
      selected,
      hasFilter,
      filterPlaceholder,
      filterIcon,
      optionSize,
      renderItem,
      optionsFilter,
      isMultiSelect,
      defaultSearchValue,
      virtualListProps,
      hasIcon,
      ...props
    } = this.props
    const options = this.search(originalOptions)
    const listHeight = height - (hasFilter ? 32 : 0)
    const currentIndex = this.getCurrentIndex()
    const scrollToIndex = currentIndex === -1 ? 0 : currentIndex

    return (
      <Pane
        height={height}
        width={width}
        display="flex"
        flexDirection="column"
        {...(props as any)}
      >
        {hasFilter && (
          <TableHead>
            <SearchTableHeaderCell
              onChange={this.handleChange}
              innerRef={this.assignSearchRef}
              borderRight="none"
              height={32}
              placeholder={filterPlaceholder}
              icon={filterIcon}
            />
          </TableHead>
        )}
        <Pane flex={1}>
          <VirtualList
            height={listHeight}
            width="100%"
            itemSize={optionSize}
            itemCount={options.length}
            overscanCount={20}
            //@ts-ignore
            scrollToAlignment="auto"
            {...(scrollToIndex
              ? {
                  scrollToIndex
                }
              : {})}
            {...virtualListProps}
            renderItem={({ index, style }) => {
              const item = options[index]
              const isSelected = this.isSelected(item)
              return renderItem({
                key: item.value,
                label: item.label,
                hasIcon,
                style,
                height: optionSize,
                onSelect: () => this.handleSelect(item),
                onDeselect: () => this.handleDeselect(item),
                isSelectable: !isSelected || isMultiSelect,
                isSelected,
                disabled: item.disabled
              })
            }}
          />
        </Pane>
      </Pane>
    )
  }
}
