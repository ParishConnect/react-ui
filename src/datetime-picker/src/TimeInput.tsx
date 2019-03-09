import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { TextInput } from '../../text-input/index'
import { Text } from '../../typography/index'
import { startOfToday, differenceInSeconds } from 'date-fns'
import { memoize } from 'lodash'
import parseTime from '../utils/parseTime'
import { ThemeContext } from '../../theme/index'

const MINUTE = 60
const HOUR = 60 * MINUTE
const ALL_DAY = 24 * HOUR
const HALF_DAY = ALL_DAY / 2

function formatStringIntoSeconds(string: string): number {
  if (!string) return differenceInSeconds(new Date(), startOfToday())
  return differenceInSeconds(parseTime(string), startOfToday())
}

class TimeInput extends React.Component<any, any> {
  time: any
  static contextType = ThemeContext
  static defaultProps = {
    showSeconds: false
  }
  state = {
    editIndex: -1,
    sec: formatStringIntoSeconds(this.props.value) || 0,
    hourWaitFor2ndNum: false,
    minuteWaitFor2ndNum: false,
    secondWaitFor2ndNum: false
  }

  componentDidUpdate() {
    if (this.props.onChange) {
      const time = `${this.getHour(
        true
      )}:${this.getMinute()}:${this.getSecond()} ${this.getAmpm()}`
      if (!this.time || this.time !== time) {
        this.props.onChange(time)
        this.time = time
      }
    }
  }

  shouldComponentUpdate(_, nextState) {
    if (this.state.sec === nextState.sec) return false
  }

  componentWillReceiveProps(nextProps) {
    const time = nextProps.value
    if (!this.time || this.time !== time) {
      this.setState({ sec: formatStringIntoSeconds(time) || 0 })
    }
  }

  onHourClick = evt => {
    evt.stopPropagation()
    evt.preventDefault()

    this.setState({
      editIndex: 0,
      minuteWaitFor2ndNum: false,
      secondWaitFor2ndNum: false
    })
  }

  onMinuteClick = evt => {
    evt.stopPropagation()
    evt.preventDefault()

    this.setState({
      editIndex: 1,
      hourWaitFor2ndNum: false,
      secondWaitFor2ndNum: false
    })
  }

  onSecondClick = evt => {
    evt.stopPropagation()
    evt.preventDefault()

    this.setState({
      editIndex: 2,
      hourWaitFor2ndNum: false,
      minuteWaitFor2ndNum: false
    })
  }

  onAmpmClick = evt => {
    evt.stopPropagation()
    evt.preventDefault()

    this.setState({
      editIndex: 3,
      hourWaitFor2ndNum: false,
      minuteWaitFor2ndNum: false,
      secondWaitFor2ndNum: false
    })
  }

  onFocus = evt => {
    evt.stopPropagation()
    evt.preventDefault()

    this.props.onFocus()
    // so that it's after onClick
    setTimeout(() => {
      if (this.state.editIndex === -1) {
        this.setState({
          editIndex: 0
        })
      }
    }, 100)
  }

  onBlur = evt => {
    evt.stopPropagation()
    evt.preventDefault()
    this.props.onBlur()

    if (this.state.editIndex !== -1) {
      this.setState({
        editIndex: -1
      })
    }
  }

  onKeyDown = evt => {
    let editIndex = this.state.editIndex

    if (evt.key === 'Tab') {
      editIndex += 1
      if (editIndex === 4) {
        editIndex = -1
      } else {
        if (editIndex === 3 && this.props.showSeconds === false) {
          editIndex = 4
        }
        evt.stopPropagation()
        evt.preventDefault()
      }
      this.setState({
        editIndex,
        hourWaitFor2ndNum: false,
        minuteWaitFor2ndNum: false,
        secondWaitFor2ndNum: false
      })
      return
    }

    evt.stopPropagation()
    evt.preventDefault()

    switch (evt.key) {
      case 'Enter':
        this.props.onBlur()
        break
      case 'ArrowLeft':
        this.setState({
          editIndex: editIndex === 0 ? editIndex : editIndex - 1,
          hourWaitFor2ndNum: false,
          minuteWaitFor2ndNum: false,
          secondWaitFor2ndNum: false
        })
        break
      case 'ArrowRight':
        this.setState({
          editIndex: editIndex === 3 ? 3 : editIndex + 1,
          hourWaitFor2ndNum: false,
          minuteWaitFor2ndNum: false,
          secondWaitFor2ndNum: false
        })
        break
      case 'Backspace':
        if (this.state.editIndex === 3) {
          this.setState({
            editIndex: 2
          })
        }
        if (this.state.editIndex === 2) {
          this.setState({
            editIndex: 1,
            sec: this.state.sec - (this.state.sec % MINUTE)
          })
        }
        if (this.state.editIndex === 1) {
          this.setState({
            editIndex: 0,
            sec:
              this.state.sec -
              (this.state.sec % HOUR) +
              (this.state.sec % MINUTE)
          })
        }
        if (this.state.editIndex === 0) {
          this.setState({
            sec: this.state.sec % HOUR
          })
        }
        break
      default:
        this.handleKey(evt.key)
    }
  }

  handleKey = key => {
    switch (this.state.editIndex) {
      case 0:
        this.handleKeyHour(key)
        break
      case 1:
        this.handleKeyMinute(key)
        break
      case 2:
        this.handleKeySecond(key)
        break
      case 3:
        this.handleKeyAmpm(key)
        break
      default:
        return
    }
  }

  handleKeyHour = key => {
    let newSec = this.state.sec
    let moveToNext = false
    let wait = false

    switch (key) {
      case 'ArrowUp':
        newSec += HOUR
        break
      case 'ArrowDown':
        newSec -= HOUR
        break
      case '0':
      case '1':
        if (!this.state.hourWaitFor2ndNum) {
          newSec -= (this.state.sec % ALL_DAY) - (this.state.sec % HOUR)
          newSec += parseInt(key, 10) * HOUR
          wait = true
        } else {
          newSec += ((this.state.sec % ALL_DAY) - (this.state.sec % HOUR)) * 9
          newSec += parseInt(key, 10) * HOUR
          wait = false
          moveToNext = true
        }
        break
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (!this.state.hourWaitFor2ndNum) {
          newSec -= (this.state.sec % ALL_DAY) - (this.state.sec % HOUR)
          newSec += parseInt(key, 10) * HOUR
        } else {
          newSec += ((this.state.sec % ALL_DAY) - (this.state.sec % HOUR)) * 9
          newSec += parseInt(key, 10) * HOUR
          if (newSec === 12 * HOUR) {
            newSec = 0
          }
        }
        moveToNext = true
        break
      default:
        return
    }

    newSec += ALL_DAY
    newSec %= ALL_DAY

    let newEditIndex = this.state.editIndex
    if (moveToNext) {
      newEditIndex += 1

      if (newEditIndex > 3) {
        newEditIndex = -1
      }
    }

    this.setState({
      sec: newSec,
      editIndex: newEditIndex,
      hourWaitFor2ndNum: wait
    })
  }

  handleKeyMinute = key => {
    let newSec = this.state.sec
    let moveToNext = false
    let wait = false

    switch (key) {
      case 'ArrowUp':
        newSec += MINUTE
        break
      case 'ArrowDown':
        newSec -= MINUTE
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        if (!this.state.minuteWaitFor2ndNum) {
          newSec -= (this.state.sec % HOUR) - (this.state.sec % MINUTE)
          newSec += parseInt(key, 10) * MINUTE
          wait = true
        } else {
          newSec += ((this.state.sec % HOUR) - (this.state.sec % MINUTE)) * 9
          newSec += parseInt(key, 10) * MINUTE
          wait = false
          moveToNext = true
        }
        break
      case '6':
      case '7':
      case '8':
      case '9':
        if (!this.state.secondWaitFor2ndNum) {
          newSec -= (this.state.sec % HOUR) - (this.state.sec % MINUTE)
          newSec += parseInt(key, 10) * MINUTE
        } else {
          newSec += ((this.state.sec % HOUR) - (this.state.sec % MINUTE)) * 9
          newSec += parseInt(key, 10) * MINUTE
        }
        moveToNext = true
        break
      default:
        return
    }

    newSec += ALL_DAY
    newSec %= ALL_DAY

    let newEditIndex = this.state.editIndex
    if (moveToNext) {
      if (this.props.showSeconds) {
        newEditIndex += 1
      } else {
        newEditIndex += 2
      }

      if (newEditIndex > 3) {
        newEditIndex = -1
      }
    }

    this.setState({
      sec: newSec,
      editIndex: newEditIndex,
      minuteWaitFor2ndNum: wait
    })
  }

  handleKeySecond = key => {
    let newSec = this.state.sec
    let moveToNext = false
    let wait = false

    switch (key) {
      case 'ArrowUp':
        newSec += 1
        break
      case 'ArrowDown':
        newSec -= 1
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        if (!this.state.secondWaitFor2ndNum) {
          newSec -= this.state.sec % 60
          newSec += parseInt(key, 10)
          wait = true
        } else {
          let seconds = (this.state.sec % 60) * 10 + parseInt(key, 10)
          newSec -= this.state.sec % 60
          newSec += seconds
          wait = false
          moveToNext = true
        }
        break
      case '6':
      case '7':
      case '8':
      case '9':
        if (!this.state.secondWaitFor2ndNum) {
          newSec -= this.state.sec % 60
          newSec += parseInt(key, 10)
        } else {
          let seconds = (this.state.sec % 60) * 10 + parseInt(key, 10)
          newSec -= this.state.sec % 60
          newSec += seconds
        }
        moveToNext = true
        break
      default:
        return
    }

    newSec += ALL_DAY
    newSec %= ALL_DAY

    let newEditIndex = this.state.editIndex
    if (moveToNext) {
      newEditIndex += 1

      if (newEditIndex > 3) {
        newEditIndex = -1
      }
    }

    this.setState({
      sec: newSec,
      editIndex: newEditIndex,
      secondWaitFor2ndNum: wait
    })
  }

  handleKeyAmpm = key => {
    let newSec = this.state.sec
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      newSec = (this.state.sec + HALF_DAY) % ALL_DAY
    } else if (key === 'a' || key === 'A') {
      newSec %= HALF_DAY
    } else if (key === 'p' || key === 'P') {
      newSec %= HALF_DAY
      newSec += HALF_DAY
    }

    this.setState({
      sec: newSec
    })
  }

  getHour = (to24Hr?: boolean) => {
    let rawHour = Math.floor(this.state.sec / HOUR)
    if (!to24Hr && rawHour > 12) {
      rawHour -= 12
    }
    let hour = rawHour.toString()
    if (hour.length < 2) {
      hour = '0' + hour
    }

    if (hour === '00') {
      hour = '12'
    }
    return hour
  }

  getMinute = () => {
    let minute = Math.floor((this.state.sec % HOUR) / MINUTE).toString()
    if (minute.length === 1) {
      minute = '0' + minute
    }

    return minute
  }

  getSecond = () => {
    let second = (this.state.sec % 60).toString()
    if (second.length === 1) {
      second = '0' + second
    }

    return second
  }

  getAmpm = () => {
    return this.state.sec < HALF_DAY ? 'AM' : 'PM'
  }

  getCSS = (isSelected: boolean) => ({
    background: isSelected
      ? this.context.palette[this.context.themeColor].light
      : '',
    borderRadius: 3
  })

  render() {
    const { height = 32, showSeconds, textSize } = this.props

    const getHour = memoize(() => this.getHour())
    const getMinute = memoize(() => this.getMinute())
    const getSecond = memoize(() => this.getSecond())
    const getAmpm = memoize(() => this.getAmpm())

    return (
      <TextInput
        is="span"
        contentEditable={true}
        suppressContentEditableWarning
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        paddingY={height / 4 + 1}
      >
        <Box
          is="span"
          paddingX={Math.round(height / 3.2)}
          contentEditable={false}
        >
          <Text
            size={textSize}
            css={this.getCSS(this.state.editIndex === 0)}
            is="span"
            onClick={this.onHourClick}
          >
            {getHour()}
          </Text>
          <Text size={textSize} is="span">
            :
          </Text>
          <Text
            size={textSize}
            css={this.getCSS(this.state.editIndex === 1)}
            is="span"
            onClick={this.onMinuteClick}
          >
            {getMinute()}
          </Text>
          {showSeconds && (
            <>
              <Text size={textSize} is="span">
                :
              </Text>
              <Text size={textSize} is="span" onClick={this.onSecondClick}>
                {getSecond()}
              </Text>
            </>
          )}
          <Text
            size={textSize}
            css={this.getCSS(this.state.editIndex === 3)}
            marginLeft={4}
            is="span"
            onClick={this.onAmpmClick}
          >
            {getAmpm()}
          </Text>
        </Box>
      </TextInput>
    )
  }
}

export default TimeInput
