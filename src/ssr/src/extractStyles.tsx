import * as React from 'react'
import { extractStyles as boxExtractStyles } from '@hennessyevan/aluminum-box'
import { renderStatic } from 'glamor/server'

export default function extractStyles() {
  const { styles, cache } = boxExtractStyles()
  const { ids, css } = renderStatic(
    () => 'let glamor believe there is some html here'
  )

  const evergreenCache = {
    uiBoxCache: cache,
    glamorIds: ids
  }

  const scriptProps = {
    type: 'application/json',
    id: 'evergreen-hydrate',
    // tslint:disable-next-line:react-no-dangerous-html
    dangerouslySetInnerHTML: { __html: JSON.stringify(evergreenCache) }
  }

  return {
    // tslint:disable-next-line:prefer-template
    css: styles + '\n' + css,
    cache: evergreenCache,
    hydrationScript: React.createElement('script', [scriptProps])
  }
}