import { EventHandlers } from '@atlaskit/editor-common'
import { Card } from '@atlaskit/smart-card'
import * as React from 'react'
import { getEventHandler } from '../../utils'

export default function BibleCard(props: {
  url?: string
  data?: object
  eventHandlers?: EventHandlers
}) {
  const { url, data, eventHandlers } = props
  const handler = getEventHandler(eventHandlers, 'smartCard')
  const onClick = url && handler ? () => handler(url) : undefined
  return <Card appearance="inline" url={url} data={data} onClick={onClick} />
}
