import { configure } from '@storybook/react'
setOptions({
  /**
   * name to display in the top left corner
   * @type {String}
   */
  name: 'Aluminum UI',
  /**
   * URL for name in top left corner to link to
   * @type {String}
   */
  url: 'https://github.com/hennessyevan/aluminum-ui',
  /**
   * show addon panel as a vertical panel on the right
   * @type {Boolean}
   */
  addonPanelInRight: false
})

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
