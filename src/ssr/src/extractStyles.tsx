import * as React from 'react'
import { extractStyles as boxExtractStyles } from '@parishconnect/box'
import { renderStatic } from 'glamor/server'

export default function extractStyles() {
  const { styles, cache } = boxExtractStyles()
  const { ids, css } = renderStatic(
    () => 'let glamor believe there is some html here'
  )

  const parishconnectCache = {
    uiBoxCache: cache,
    glamorIds: ids
  }

  const scriptProps = {
    type: 'application/json',
    id: 'parishconnect-hydrate',
    // tslint:disable-next-line:react-no-dangerous-html
    dangerouslySetInnerHTML: { __html: JSON.stringify(parishconnectCache) }
  }

  return {
    // tslint:disable-next-line:prefer-template
    css: styles + '\n' + css,
    cache: parishconnectCache,
    hydrationScript: React.createElement('script', [scriptProps])
  }
}
