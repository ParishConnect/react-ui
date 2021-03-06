import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@parishconnect/box'
import { CornerDialog, Button } from '../src'
import Component from '@reactions/component'

storiesOf('corner-dialog', module).add('CornerDialog', () => (
  <Box padding={40}>
    {(() => {
      document.body.style.margin = '0'
      document.body.style.height = '100vh'
    })()}
    <Component initialState={{ isShown: false }}>
      {({ state, setState }) => (
        <Box>
          <CornerDialog
            title="Welcome to This New Feature"
            isShown={state.isShown}
            onCloseComplete={() => setState({ isShown: false })}
          >
            The Corner Dialog component is used for new feature announcements
            and feedback requests from the user.
          </CornerDialog>
          <Button onClick={() => setState({ isShown: true })}>
            Show “Learn More” Corner Dialog
          </Button>
        </Box>
      )}
    </Component>
    <Component initialState={{ isShown: false }}>
      {({ state, setState }) => (
        <Box marginTop={24}>
          <CornerDialog
            title="We’d Love to Hear from You!"
            isShown={state.isShown}
            confirmLabel="Get in Touch"
            onCloseComplete={() => setState({ isShown: false })}
          >
            Help shape Segment’s data governance product roadmap. If you’re
            willing to provide feedback, let’s chat.
          </CornerDialog>
          <Button onClick={() => setState({ isShown: true })}>
            Show “Get in Touch” Corner Dialog
          </Button>
        </Box>
      )}
    </Component>
    <Component initialState={{ isShown: false }}>
      {({ state, setState }) => (
        <Box marginTop={24}>
          <CornerDialog
            title="GDPR Data Processing Agreement Available"
            isShown={state.isShown}
            width={492}
            confirmLabel="View Agreement"
            onCloseComplete={() => setState({ isShown: false })}
          >
            Segment now offers a Data Processing Agreement and EU&nbsp;Model
            Contract Clauses as a means of meeting the adequacy and security
            requirements of the GDPR.
          </CornerDialog>
          <Button onClick={() => setState({ isShown: true })}>
            Show “GDPR” Corner Dialog {JSON.stringify(state.isShown)}
          </Button>
        </Box>
      )}
    </Component>
  </Box>
))
