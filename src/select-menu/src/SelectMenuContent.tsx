import * as React from 'react'
import { Pane } from '../../layers'
import { Heading } from '../../typography'
import { IconButton } from '../../buttons'
import OptionsList, { OptionsListProps } from './OptionsList'
import OptionShapePropType from './OptionShapePropType'

const DefaultTitleView = ({
  close,
  title,
  headerHeight
}: {
  close: any
  title: string
  headerHeight: number
}) => (
  <Pane
    display="flex"
    alignItems="center"
    borderBottom="default"
    padding={8}
    height={headerHeight}
    boxSizing="border-box"
  >
    <Pane flex="1" display="flex" alignItems="center">
      <Heading size={400}>{title}</Heading>
    </Pane>
    <IconButton icon="cross" appearance="minimal" height={24} onClick={close} />
  </Pane>
)

export interface SelectMenuContentProps {
  title: string | undefined
  width?: number
  height?: number
  options: OptionShapePropType[]
  hasTitle: boolean
  hasFilter: boolean
  filterPlaceholder?: string
  filterIcon?: any
  listProps?: OptionsListProps | any
  /**
   * When true, multi select is accounted for.
   */
  isMultiSelect?: boolean
  /**
   * Node that is placed right next to the options.
   */
  detailView?: any
  /**
   * Node that is displayed instead of options list when there are no options.
   */
  emptyView?: any
  /**
   * Node that is placed in the header section, above the options.
   */
  titleView: any
  close?: any
}
export default class SelectMenuContent extends React.PureComponent<
  SelectMenuContentProps
> {
  static defaultProps = {
    options: [],
    hasTitle: true,
    hasFilter: true,
    titleView: DefaultTitleView
  }

  render() {
    const {
      title,
      width,
      height,
      options,
      hasTitle,
      hasFilter,
      filterPlaceholder,
      filterIcon,
      close,
      listProps,
      titleView,
      detailView,
      emptyView,
      isMultiSelect
    } = this.props

    const headerHeight = 40
    const optionsListHeight = hasTitle ? height! - headerHeight : height

    const hasDetailView = Boolean(detailView)
    const hasEmptyView = Boolean(emptyView)

    return (
      <Pane display="flex" height={height}>
        <Pane
          width={width}
          height={height}
          display="flex"
          flexDirection="column"
          borderRight={hasDetailView ? 'muted' : undefined}
        >
          {hasTitle && titleView({ close, title, headerHeight })}
          {options.length === 0 && hasEmptyView ? (
            <Pane height={optionsListHeight}>{emptyView}</Pane>
          ) : (
            <OptionsList
              height={optionsListHeight}
              hasFilter={hasFilter}
              filterPlaceholder={filterPlaceholder}
              filterIcon={filterIcon}
              options={options}
              isMultiSelect={isMultiSelect}
              close={close}
              {...listProps}
            />
          )}
        </Pane>
        {hasDetailView && detailView}
      </Pane>
    )
  }
}
