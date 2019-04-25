import * as React from 'react'
import ToolbarButton from '../ToolbarButton'
import WithHelpTrigger from '../WithHelpTrigger'
import { HelpCircleIcon } from '../../../../icons/index'

const ToolbarHelp = () => (
  <WithHelpTrigger
    render={showHelp => (
      <ToolbarButton
        onClick={showHelp}
        title="Open help dialog"
        titlePosition="left"
        iconBefore={HelpCircleIcon}
      />
    )}
  />
)

export default ToolbarHelp
