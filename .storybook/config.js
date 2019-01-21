import { configure } from '@storybook/react'

// automatically import all files ending in *.stories.tsx
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

function loadStories() {
  requireAll(require.context('../stories', true, /\.tsx?$/))
}

configure(loadStories, module)
