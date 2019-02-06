import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { TimeZone } from '../src'
import { Manager } from '../src/manager'

storiesOf('timezone', module).add('TimeZone', () => (
  <Box>
    <Manager>
      {({ state, setState }) => (
        <React.Fragment>
          <TimeZone
            name="test"
            returnValue="object"
            onChange={e =>
              setState({ [e.target.name]: JSON.parse(e.target.value) })
            }
          />
          <pre>{JSON.stringify(state, null, 3)}</pre>
        </React.Fragment>
      )}
    </Manager>
  </Box>
))
