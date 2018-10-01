import { hydrate as boxHydrate } from '@hennessyevan/aluminum-box'
import { hydrate as rehydrate } from 'emotion'

/**
 * You shouldn't have to manually run this.
 * This is mainly an export for testing purposes.
 */
export function hydrate(hydration) {
  if (hydration.uiBoxCache) {
    boxHydrate(hydration.uiBoxCache)
  }

  if (hydration.emotionIds) {
    rehydrate(hydration.emotionIds)
  }
}

export default function autoHydrate() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const hydration = document.getElementById('evergreen-hydrate')

    if (hydration) {
      try {
        const hydrationObject = JSON.parse(hydration.innerHTML)
        hydrate(hydrationObject)
      } catch (err) {
        console.error(
          'Evergreen automatic hydration object is invalid JSON',
          err
        )
      }
    }
  }
}
