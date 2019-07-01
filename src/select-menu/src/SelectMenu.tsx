import * as React from 'react'
import arrify from 'arrify'
import { Popover } from '../../popover'
import { Position, PositionEnum, PositionType } from '../../constants'
import SelectMenuContent from './SelectMenuContent'
import OptionShapePropType from './OptionShapePropType'
import { SelectedPropType } from './SelectedPropType'
import { SearchIcon } from '../../icons/index'

export interface SelectMenuProps {
  /**
   * The title of the Select Menu.
   */
  title?: string
  /**
   * The width of the Select Menu.
   */
  width?: number
  /**
   * The height of the Select Menu.
   */
  height?: number
  /**
   * The options to show in the menu.
   * [{ label: String, value: String | Number, labelInList?: String }]
   */
  options?: OptionShapePropType[]
  /**
   * The selected value/values.
   */
  selected?: SelectedPropType
  /**
   * When true, multi select is accounted for.
   */
  isMultiSelect?: boolean
  /**
   * When true, show the title.
   */
  hasTitle?: boolean
  /**
   * When true, show the filter.
   */
  hasFilter?: boolean
  /**
   * The position of the Select Menu.
   */
  position?: PositionEnum | PositionType | any
  /**
   * The icon of the search filter.
   */
  filterIcon: React.ReactChild
  /**
   * The placeholder of the search filter.
   */
  filterPlaceholder: string
  /**
   * Can be a function that returns a node, or a node itself, that is
   * rendered on the right side of the Select Menu to give additional
   * information when an option is selected.
   */
  detailView?: any
  /**
   * Can be a function that returns a node, or a node itself, that is
   * rendered in the header section of the Select Menu to customize
   * the header.
   */
  titleView?: any
  /**
   * Can be a function that returns a node, or a node itself, that is
   * rendered instead of the options list when there are no options.
   */
  emptyView?: any
  /**
   * Function that is called when an option is selected.
   */
  onSelect?: any
  /**
   * Function that is called when an option is deselected.
   */
  onDeselect?: any
  /**
   * Function that is called as the onChange() event for the filter.
   */
  onFilterChange?: any
}

export default class SelectMenu extends React.PureComponent<SelectMenuProps> {
  static defaultProps = {
    onSelect: () => {},
    onDeselect: () => {},
    width: 240,
    height: 248,
    position: Position.BOTTOM_LEFT,
    isMultiSelect: false,
    filterPlaceholder: 'Filter...',
    filterIcon: SearchIcon
  }

  getDetailView = (close, detailView) => {
    if (typeof detailView === 'function') {
      return {
        detailView: detailView({ close })
      }
    }

    if (detailView) {
      return { detailView }
    }

    return {}
  }

  getEmptyView = (close, emptyView) => {
    if (typeof emptyView === 'function') {
      return {
        emptyView: emptyView({ close })
      }
    }

    if (emptyView) {
      return { emptyView }
    }

    return {}
  }

  render() {
    const {
      title,
      width,
      height,
      options,
      selected,
      position,
      hasTitle,
      hasFilter,
      filterPlaceholder,
      filterIcon,
      detailView,
      emptyView,
      titleView,
      isMultiSelect,
      ...props
    } = this.props

    return (
      <Popover
        minWidth={width}
        position={position}
        minHeight={height}
        content={({ close }) => (
          <SelectMenuContent
            width={width}
            height={height}
            options={options}
            title={title}
            hasFilter={hasFilter}
            filterPlaceholder={filterPlaceholder}
            filterIcon={filterIcon}
            hasTitle={hasTitle}
            isMultiSelect={isMultiSelect}
            titleView={titleView}
            listProps={{
              onSelect: item => {
                this.props.onSelect(item)
              },
              onDeselect: item => {
                this.props.onDeselect(item)
              },
              onFilterChange: this.props.onFilterChange,
              selected: arrify(selected)
            }}
            close={close}
            {...this.getDetailView(close, detailView)}
            {...this.getEmptyView(close, emptyView)}
          />
        )}
        {...props as any}
      />
    )
  }
}
