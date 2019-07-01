import * as React from 'react'
import VirtualList from 'react-tiny-virtual-list'
import { debounce } from 'lodash'
import { Pane, PaneProps } from '../../layers'

export interface TableVirtualBodyProps extends PaneProps {
  children?: any
  /**
   * Default height of each row.
   * 48 is the default height of a TableRow.
   */
  defaultHeight?: number

  /**
   * When true, support `height="auto"` on children being rendered.
   * This is somewhat of an expirmental feature.
   */
  allowAutoHeight?: boolean

  /**
   * The overscanCount property passed to react-tiny-virtual-list.
   */
  overscanCount?: number

  /**
   * When passed, this is used as the `estimatedItemSize` in react-tiny-virtual-list.
   * Only when `allowAutoHeight` and`useAverageAutoHeightEstimation` are false.
   */
  estimatedItemSize?: number

  /**
   * When allowAutoHeight is true and this prop is true, the estimated height
   * will be computed based on the average height of auto height rows.
   */
  useAverageAutoHeightEstimation?: boolean
}

interface TableVirtualBodyState {
  isIntegerHeight: boolean
  calculatedHeight: number
}

export default class TableVirtualBody extends React.PureComponent<
  TableVirtualBodyProps,
  TableVirtualBodyState
> {
  static defaultProps = {
    defaultHeight: 48,
    allowAutoHeight: false,
    overscanCount: 5,
    useAverageAutoHeightEstimation: true
  }

  autoHeights: any
  autoHeightRefs: any
  averageAutoHeight: any
  paneRef: any

  state: TableVirtualBodyState = {
    isIntegerHeight: false,
    calculatedHeight: 0
  }

  constructor(props: TableVirtualBodyProps) {
    super(props)

    this.initializeHelpers()

    // Add a onResize.
    this.onResize = debounce(this.onResize, 200)
  }

  static getDerivedStateFromProps(
    props: TableVirtualBodyProps,
    state: TableVirtualBodyState
  ) {
    if (props.height !== state.calculatedHeight) {
      return {
        isIntegerHeight: Number.isInteger(props.height as any)
      }
    }

    // Return null to indicate no change to state.
    return null
  }

  componentDidMount() {
    // Call this to initialize and set
    this.updateOnResize()
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  initializeHelpers = () => {
    this.autoHeights = []
    this.autoHeightRefs = []
    this.averageAutoHeight = this.props.defaultHeight || 48
  }

  /**
   * This function will process all items that have height="auto" set.
   * It will loop through all refs and get calculate the height.
   */
  processAutoHeights = () => {
    let isUpdated = false

    // This will determine the averageAutoHeight.
    let total = 0
    let totalAmount = 0

    // Loop through all of the refs that have height="auto".
    this.autoHeightRefs.forEach((ref: any, index: any) => {
      /*  If the height is already calculated, skip it,
      /* but calculate the height for the total.
      */
      if (this.autoHeights[index]) {
        total += this.autoHeights[index]
        totalAmount += 1
        return
      }

      // Make sure the ref has a child
      if (
        ref &&
        ref.childNodes &&
        ref.childNodes[0] &&
        Number.isInteger(ref.childNodes[0].offsetHeight)
      ) {
        const height = ref.childNodes[0].offsetHeight

        // Add to the total to calculate the averageAutoHeight.
        total += height
        totalAmount += 1

        // Cache the height.
        this.autoHeights[index] = height

        // Set the update flag to true.
        isUpdated = true
      }
    })

    // Save the average height.
    this.averageAutoHeight = total / totalAmount

    // There are some new heights detected that had previously not been calculated.
    // Call forceUpdate to make sure the virtual list renders again.
    if (isUpdated) this.forceUpdate()
  }

  onRef = (ref: any) => {
    this.paneRef = ref
  }

  onVirtualHelperRef = (index: string | number, ref: any) => {
    this.autoHeightRefs[index] = ref

    requestAnimationFrame(() => {
      this.processAutoHeights()
    })
  }

  onResize = () => {
    this.updateOnResize()
  }

  updateOnResize = () => {
    this.initializeHelpers()

    // Simply return when we now the height of the pane is fixed.
    if (this.state.isIntegerHeight) return

    // Return if we are in a weird edge case in which the ref is no longer valid.
    if (this.paneRef) {
      const calculatedHeight = this.paneRef.offsetHeight

      if (calculatedHeight > 0) {
        // Save the calculated height which is needed for the VirtualList.
        this.setState({
          calculatedHeight
        })

        // Prevent updateOnResize being called recursively when there is a valid height.
        return
      }
    }

    // When height is still 0 (or paneRef is not valid) try recursively until success.
    requestAnimationFrame(() => {
      this.updateOnResize()
    })
  }

  getItemSize = (children: {
    [x: string]: { props: { height: string } }
    map: any
  }) => {
    const {
      allowAutoHeight = false,
      useAverageAutoHeightEstimation = true,
      defaultHeight = 48
    } = this.props

    // Prefer to return a array of all heights.
    if (!allowAutoHeight) {
      return children.map((child: {} | null | undefined) => {
        if (!React.isValidElement(child)) return defaultHeight
        const { height }: any = child.props

        if (Number.isInteger(height)) {
          return height
        }

        return defaultHeight
      })
    }

    // If allowAutoHeight is true, return a function instead.
    const itemSizeFn = (index: string | number) => {
      if (!React.isValidElement(children[index])) return defaultHeight
      const { height }: any = children[index].props

      // When the height is number simply, simply return it.
      if (Number.isInteger(height)) {
        return height
      }

      // When allowAutoHeight is set and  the height is set to "auto"...
      if (allowAutoHeight && children[index].props.height === 'auto') {
        // ... and the height is calculated, return the calculated height.
        if (this.autoHeights[index]) return this.autoHeights[index]

        // ... if the height is not yet calculated, return the averge
        if (useAverageAutoHeightEstimation) return this.averageAutoHeight
      }

      // Return the default height.
      return defaultHeight
    }

    // tslint:disable-next-line:no-var-before-return
    return itemSizeFn
  }

  render() {
    const {
      children: inputChildren,
      height: paneHeight,
      allowAutoHeight,
      overscanCount,
      estimatedItemSize,
      useAverageAutoHeightEstimation,
      ...props
    } = this.props

    // Children always needs to be an array.
    const children = Array.isArray(inputChildren)
      ? inputChildren
      : React.Children.toArray(inputChildren)

    const itemSize = this.getItemSize(children as any)

    // VirtualList needs a fixed height.
    const { calculatedHeight, isIntegerHeight } = this.state

    return (
      <Pane
        data-evergreen-table-body
        innerRef={this.onRef}
        height={paneHeight}
        flex="1"
        overflow="hidden"
        {...(props as any)}
      >
        <VirtualList
          height={isIntegerHeight ? paneHeight : (calculatedHeight as any)}
          width="100%"
          estimatedItemSize={
            allowAutoHeight && useAverageAutoHeightEstimation
              ? this.averageAutoHeight
              : estimatedItemSize || null
          }
          itemSize={itemSize}
          overscanCount={overscanCount}
          itemCount={React.Children.count(children)}
          renderItem={({ index, style }) => {
            // If some children are strings by accident, support this gracefully.
            if (!React.isValidElement(children[index])) {
              if (typeof children[index] === 'string') {
                return <div style={style}>{children[index]}</div>
              }
              return <div style={style}>&nbsp;</div>
            }

            // When allowing height="auto" for rows, and a auto height item is
            // Rendered for the first time...
            if (
              allowAutoHeight &&
              React.isValidElement(children[index]) &&
              children[index].props.height === 'auto' &&
              // ... and only when the height is not already been calculated.
              !this.autoHeights[index]
            ) {
              // ... render the item in a helper div, the ref is used to calculate
              // The height of its children.
              return (
                <div
                  ref={ref => this.onVirtualHelperRef(index, ref)}
                  data-virtual-index={index}
                  style={{
                    opacity: 0,
                    ...style
                  }}
                >
                  {children[index]}
                </div>
              )
            }

            // When allowAutoHeight is false, or when the height is known.
            // Simply render the item.
            return React.cloneElement(children[index], {
              style
            })
          }}
        />
      </Pane>
    )
  }
}
