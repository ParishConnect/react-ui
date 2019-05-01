import { configure, addParameters } from '@storybook/react'

addParameters({
  options: {
    showPanel: false
  }
})

// automatically import all files ending in *.stories.tsx
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

function loadStories() {
  requireAll(require.context('../stories', true, /\.tsx?$/))
}

configure(loadStories, module)
