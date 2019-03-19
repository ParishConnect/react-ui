import arrify from 'arrify'
import { format } from 'date-fns'
import { memoize } from 'lodash'
import * as React from 'react'
import { IconButton } from '../../buttons/index'
import { Position } from '../../constants/index'
import { XIcon } from '../../icons/index'
import { Pane } from '../../layers/index'
import { OptionsList } from '../../select-menu/index'
import { ThemeContext } from '../../theme/index'
import { Heading } from '../../typography/index'

const arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right'
}

const ISO_TIME_REGEX = /([01]?[0-9]|2[0-3]):([0-5][0-9])/

interface TimeMenuProps {
  close: () => void
}

export default class TimeMenu extends React.Component<any, any> {
  static contextType = ThemeContext
  constructor(props) {
    super(props)
    const { hour, minute, meridian } = this.parseTime(props.value)

    this.state = {
      hour,
      minute,
      meridian,
      hourOffset: 0,
      minuteOffset: 0,
      meridianOffset: 0
    }
  }

  static defaultProps = {
    onSelect: () => {},
    onDeselect: () => {},
    onChange: () => {},
    value: format(new Date(), 'HH:mm'),
    width: 192,
    height: 206,
    position: Position.BOTTOM_LEFT,
    isMultiSelect: false,
    allowedHours: 12,
    interval: 5
  }

  getBuffer = () => {
    const bufferCount = this.props.height / 2 - 33
    const roundedCount = Math.round(bufferCount / 33)
    let bufferArray: any[] = []
    for (let i = 0; i < roundedCount; i++) {
      bufferArray.push({ disabled: true, label: '' })
    }
    return bufferArray
  }

  getHours = () => {
    let hours: object[] = []

    if (typeof this.props.allowedHours === 'number') {
      for (let i = 0; i < this.props.allowedHours; i++) {
        hours.push({ value: i + 1, label: i + 1 })
      }
    }

    if (this.props.allowedHours instanceof Array) {
      hours = this.props.allowedHours
    }

    const buffer = this.getBuffer()

    return [...buffer, ...hours, ...buffer]
  }

  getMinutes = () => {
    let minutes: object[] = []
    const iterations = 60 / this.props.interval
    for (let i = 0; i < iterations; i++) {
      let k: number = i * this.props.interval
      minutes.push({
        value: k,
        label: String(this.padTime(k))
      })
    }
    const buffer = this.getBuffer()
    return [...buffer, ...minutes, ...buffer]
  }

  getMeridians = () => {
    const buffer = this.getBuffer()
    return [
      ...buffer,
      { label: 'AM', value: 'AM' },
      { label: 'PM', value: 'PM' },
      ...buffer
    ]
  }

  padTime = time => {
    if (time < 10) {
      return `0${time}`
    }
    return time
  }

  getIndexes = (raw: any[]) => {
    const obj = {}
    raw.forEach(part => {
      obj[part.name] = part.collection.findIndex(
        (k: any) => k.value === part.value
      )
    })
    return obj
  }

  formatTime = ({ hour, minute, meridian }) => {
    const hour24 = this.to24Time(hour, meridian)
    return `${this.padTime(hour24)}:${this.padTime(minute)}`
  }

  parseMeridian = (hour: number): string => {
    return hour >= 12 ? 'PM' : 'AM'
  }

  parseTime = (iso: string) => {
    const match = ISO_TIME_REGEX.exec(iso)
    if (!match)
      return {
        hour: 1,
        minute: this.props.interval,
        meridian: 'AM'
      }
    const [, rawHour, rawMinute] = match
    const meridian = this.parseMeridian(parseInt(rawHour, 10))
    const hour = this.to12Time(parseInt(rawHour, 10), meridian)
    const minute = parseInt(rawMinute, 10)

    return { hour, minute, meridian }
  }

  changeTime = ({
    hour = this.state.hour,
    minute = this.state.minute,
    meridian = this.state.meridian
  }) => {
    const value = this.formatTime({ hour, minute, meridian })
    this.setState({ value, hour, minute, meridian })
    this.props.onChange(value, { hour, minute, meridian })
  }

  handleSelect = ({ value }, name: string) => {
    let dateObj = {
      hour: this.state.hour,
      minute: this.state.minute,
      meridian: this.state.meridian
    }
    dateObj[name] = value
    this.changeTime(dateObj)
  }

  to24Time = (hour: number, meridian: string) => {
    if (meridian === 'AM' && hour === 12) {
      return 0
    }
    if (meridian === 'PM') {
      if (hour < 12) return hour + 12
      return this.padTime(hour)
    }
    return hour
  }

  to12Time = (hour: number, meridian: string) => {
    if (hour === 0) return 12
    if (meridian === 'PM') {
      if (hour > 12) return hour - 12
    }
    return hour
  }

  handleKeyDown = (e, name) => {
    const { key } = e
    const arrowKey = arrowKeys[key]
    switch (arrowKey) {
      case 'up':
        console.log(name)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === this.props.value) return false
    this.changeTime(this.parseTime(nextProps.value))
  }

  render() {
    const {
      width,
      height,
      hasTitle = true,
      close = () => {},
      title = 'Pick a Time',
      listProps,
      detailView,
      emptyView,
      isMultiSelect
    } = this.props
    const theme = this.context
    const { hour, minute, meridian } = this.state

    const getHours = memoize(() => this.getHours())
    const getMinutes = memoize(() => this.getMinutes())
    const getMeridians = memoize(() => this.getMeridians())

    const headerHeight = 40
    const optionsListHeight = hasTitle ? height - headerHeight : height
    const hasDetailView = Boolean(detailView)
    const hasEmptyView = Boolean(emptyView)
    const commonOptionsListProps = {
      width: width / 3,
      height: optionsListHeight,
      hasFilter: false,
      hasIcon: false,
      textAlign: 'right',
      isMultiSelect: isMultiSelect,
      close: close,
      ...listProps
    }

    const indexes = this.getIndexes([
      {
        name: 'hour',
        value: this.to12Time(hour, meridian),
        collection: getHours()
      },
      { name: 'minute', value: minute, collection: getMinutes() },
      { name: 'meridian', value: meridian, collection: getMeridians() }
    ])

    const virtualListProps = (name: string) => {
      return {
        scrollToAlignment: 'center',
        scrollToIndex: indexes[name],
        name
      }
    }

    return (
      <Pane display="flex" height={height}>
        <Pane
          borderTop="muted"
          borderBottom="muted"
          background={theme.colors.background[`${theme.themeColor}Tint`]}
          height={33}
          width={width}
          position="absolute"
          top={height / 2 + headerHeight - 36}
        />
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

          <Pane display="flex" width="100%">
            {getHours().length === 0 && hasEmptyView ? (
              <Pane height={optionsListHeight}>{emptyView}</Pane>
            ) : (
              <OptionsList
                onFocus={this.props.onFocus}
                onKeyDown={e => this.handleKeyDown(e, 'hour')}
                options={getHours()}
                onSelect={item => this.handleSelect(item, 'hour')}
                virtualListProps={virtualListProps('hour')}
                borderRight="muted"
                selected={arrify(hour)}
                {...commonOptionsListProps}
              />
            )}
            {getMinutes().length === 0 && hasEmptyView ? (
              <Pane height={optionsListHeight}>{emptyView}</Pane>
            ) : (
              <OptionsList
                onFocus={this.props.onFocus}
                name="minute"
                options={getMinutes()}
                onSelect={item => this.handleSelect(item, 'minute')}
                virtualListProps={virtualListProps('minute')}
                borderRight="muted"
                selected={arrify(minute)}
                {...commonOptionsListProps}
              />
            )}
            {getMeridians().length === 0 && hasEmptyView ? (
              <Pane height={optionsListHeight}>{emptyView}</Pane>
            ) : (
              <OptionsList
                onFocus={this.props.onFocus}
                name="meridian"
                options={getMeridians()}
                onSelect={item => this.handleSelect(item, 'meridian')}
                virtualListProps={virtualListProps('meridian')}
                selected={arrify(meridian)}
                {...commonOptionsListProps}
              />
            )}
          </Pane>
        </Pane>
        {hasDetailView && detailView}
      </Pane>
    )
  }
}
