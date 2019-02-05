import * as React from 'react'
import SelectField from '../../select/src/SelectField'
import moment from 'moment-timezone'
import { timezones } from './data/timezones'
import { SelectProps } from '../../select/src/Select'

export interface TimeZoneProps extends SelectProps {
  /**
   * Timezone Array Items
   * defaults to aluminum timezones cldr
   */
  items?: string[] | object[]

  /**
   * value to return onChange
   */
  returnValue?: 'value' | 'abbr' | 'offset' | 'isdst' | 'text' | 'utc'
}

export default class TimeZone extends React.Component<TimeZoneProps> {
  items: any = timezones
  guessedZone: any = moment.tz.guess()
  default: any

  getOptions = (items: object[]) => {
    if (!items) {
      return <option>No Options Loaded</option>
    }

    const { returnValue = 'text' } = this.props

    return items.map((item: any, i: number) => {
      const selected: boolean = item.utc.includes(this.guessedZone)
      if (selected) {
        this.default = selected
      }

      return (
        <option
          key={item.abbr + i}
          selected={selected ? true : false}
          value={String(item[returnValue])}
          data-return-value={String(returnValue)}
        >
          {item.text}
        </option>
      )
    })
  }

  render() {
    const { items = this.items } = this.props
    return <SelectField {...this.props}>{this.getOptions(items)}</SelectField>
  }
}
