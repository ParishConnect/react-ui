import * as React from 'react'
import SelectField from '../../select/src/SelectField'
import moment from 'moment-timezone'
import { timezones } from './data/timezones'

export default class TimeZone extends React.Component<any, any> {
  items: any = timezones
  guessedZone: any = moment.tz.guess()

  render() {
    const { items = this.items } = this.props
    return (
      <SelectField {...this.props}>
        {items &&
          items.map((item: any) => {
            const selected: boolean = item.utc.includes(this.guessedZone)
            console.log(selected)

            return (
              <option key={item.abbr} selected={selected} value={item}>
                {item.text}
              </option>
            )
          })}
      </SelectField>
    )
  }
}
