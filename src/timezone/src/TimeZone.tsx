import * as React from 'react'
import Combobox, {
  ComboboxProps,
  ComboboxState
} from '../../combobox/src/Combobox'
import moment from 'moment-timezone'
import { find } from 'lodash'
import { timezones } from './data/timezones.js'

export default class TimeZone extends React.Component<
  ComboboxProps,
  ComboboxState
> {
  items: any = timezones
  guessedZone: any = moment.tz.guess()

  state: ComboboxState = {
    isOpenedByButton: false
  }

  render() {
    const { items = this.items } = this.props
    return (
      <Combobox
        items={items}
        defaultSelectedItem={find(this.items, item =>
          item.utc.includes(this.guessedZone)
        )}
        itemToString={(i: any) => (i ? i.text : '')}
        {...this.props}
      />
    )
  }
}
