import {
  BlockCardErroredView,
  BlockCardForbiddenView,
  BlockCardResolvedView,
  BlockCardResolvingView,
  BlockCardUnauthorisedView,
  InlineCardErroredView,
  InlineCardForbiddenView,
  InlineCardResolvedView,
  InlineCardResolvingView,
  InlineCardUnauthorizedView
} from '@atlaskit/media-ui'
import * as React from 'react'
import LazyRender from 'react-lazily-render'
import { Client, ObjectState } from '../Client'
import { DefinedState } from '../Client/types'
import { extractBlockPropsFromJSONLD } from '../extractBlockPropsFromJSONLD'
import { extractInlinePropsFromJSONLD } from '../extractInlinePropsFromJSONLD'
import { WithObject } from '../WithObject'
import { CardAppearance } from './types'
import { CardLinkView } from './views/CardLinkView'

const getCollapsedIcon = (state: DefinedState): string | undefined => {
  const { data } = state
  return (
    data && data.generator && data.generator.icon && data.generator.icon.url
  )
}

const renderBlockCard = (
  url: string,
  state: ObjectState,
  handleAuthorise: (() => void) | undefined,
  handleErrorRetry: () => void,
  handleFrameClick: () => void,
  isSelected?: boolean
) => {
  switch (state.status) {
    case 'pending':
      return <CardLinkView link={url} isSelected={isSelected} />

    case 'resolving':
      return (
        <BlockCardResolvingView
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      )

    case 'resolved':
      return (
        <BlockCardResolvedView
          {...extractBlockPropsFromJSONLD(state.data || {})}
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      )

    case 'unauthorized':
      return (
        <BlockCardUnauthorisedView
          icon={getCollapsedIcon(state)}
          isSelected={isSelected}
          url={url}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      )

    case 'forbidden':
      return (
        <BlockCardForbiddenView
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      )

    case 'not-found':
      return (
        <BlockCardErroredView
          url={url}
          isSelected={isSelected}
          message="We couldn't find this link"
          onClick={handleFrameClick}
        />
      )

    case 'errored':
      return (
        <BlockCardErroredView
          url={url}
          isSelected={isSelected}
          message="We couldn't load this link"
          onClick={handleFrameClick}
          onRetry={handleErrorRetry}
        />
      )
  }
}

const renderInlineCard = (
  url: string,
  state: ObjectState,
  handleAuthorise: (() => void) | undefined,
  handleFrameClick: () => void,
  isSelected?: boolean
): React.ReactNode => {
  switch (state.status) {
    case 'pending':
      return <CardLinkView link={url} isSelected={isSelected} />

    case 'resolving':
      return (
        <InlineCardResolvingView
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      )

    case 'resolved':
      return (
        <InlineCardResolvedView
          {...extractInlinePropsFromJSONLD(state.data || {})}
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      )

    case 'unauthorized':
      return (
        <InlineCardUnauthorizedView
          icon={getCollapsedIcon(state)}
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      )

    case 'forbidden':
      return (
        <InlineCardForbiddenView
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      )

    case 'not-found':
      return (
        <InlineCardErroredView
          url={url}
          isSelected={isSelected}
          message="We couldn't find this link"
          onClick={handleFrameClick}
        />
      )

    case 'errored':
      return <CardLinkView link={url} isSelected={isSelected} />
  }
}

export type CardWithUrlContentProps = {
  client: Client
  url: string
  appearance: CardAppearance
  onClick?: () => void
  isSelected?: boolean
  authFn: (startUrl: string) => Promise<void>
}

export function CardWithUrlContent(props: CardWithUrlContentProps) {
  const { url, isSelected, onClick, client, appearance, authFn } = props
  return (
    <LazyRender
      offset={100}
      component={appearance === 'inline' ? 'span' : 'div'}
      placeholder={
        <CardLinkView
          isSelected={isSelected}
          key={'lazy-render-placeholder'}
          link={url}
        />
      }
      content={
        <WithObject
          client={client}
          url={url}
          isSelected={isSelected}
          appearance={appearance}
        >
          {({ state, reload }) => {
            // TODO: support multiple auth services
            const firstAuthService =
              (state as DefinedState).services &&
              (state as DefinedState).services[0]

            const handleAuthorise = () => {
              authFn(firstAuthService.startAuthUrl).then(
                () => {
                  reload()
                },
                (err: Error) => {
                  reload()
                }
              )
            }

            if (appearance === 'inline') {
              return renderInlineCard(
                url,
                state,
                firstAuthService ? handleAuthorise : undefined,
                () => (onClick ? onClick() : window.open(url)),
                isSelected
              )
            }

            return renderBlockCard(
              url,
              state,
              firstAuthService ? handleAuthorise : undefined,
              reload,
              () => (onClick ? onClick() : window.open(url)),
              isSelected
            )
          }}
        </WithObject>
      }
    />
  )
}
