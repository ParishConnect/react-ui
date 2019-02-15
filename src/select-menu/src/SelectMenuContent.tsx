import * as React from 'react'
import { noop } from 'lodash'
import { IconButton } from '../../buttons'
import { Pane, PaneProps } from '../../layers'
import { Heading } from '../../typography'
import OptionsList, { OptionsListProps } from './OptionsList'
import OptionShapePropType from './OptionShapePropType'
import { XIcon } from '../../icons/index'

export interface SelectMenuContentProps extends PaneProps {
  title: string | undefined
  width?: number
  height?: number
  options?: OptionShapePropType[]
  hasTitle?: boolean
  hasFilter?: boolean
  listProps?: OptionsListProps
  /**
   * When true, multi select is accounted for.
   */
  isMultiSelect?: boolean
  /**
   * Node that is placed right next to the options.
   */
  detailView?: React.ReactNode
  /**
   * Node that is displayed instead of options list when there are no options.
   */
  emptyView?: React.ReactNode
  close?: any
}

export default class SelectMenuContent extends React.PureComponent<
  SelectMenuContentProps
> {
  static defaultProps = {
    options: [],
    hasTitle: true,
    hasFilter: true
  }

  render() {
    const {
      width,
      height = 248,
      options = [],
      hasTitle = true,
      hasFilter = true,
      close = noop,
      title,
      listProps,
      detailView,
      emptyView,
      isMultiSelect
    } = this.props

    const headerHeight = 40
    const optionsListHeight = hasTitle ? height - headerHeight : height
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
          {hasTitle && (
            <Pane
              display="flex"
              alignItems="center"
              borderBottom="default"
              padding={8}
              height={headerHeight}
              boxSizing="border-box"
            >
              <Pane flex="1">
                <Heading size={400}>{title}</Heading>
              </Pane>
              <IconButton
                icon={XIcon}
                appearance="minimal"
                height={24}
                onClick={close}
              />
            </Pane>
          )}

          {options.length === 0 && hasEmptyView ? (
            <Pane height={optionsListHeight}>{emptyView}</Pane>
          ) : (
            <OptionsList
              height={optionsListHeight}
              hasFilter={hasFilter}
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
