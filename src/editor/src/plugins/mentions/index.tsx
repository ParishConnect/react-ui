import { mention } from '@atlaskit/adf-schema'
import {
  ContextIdentifierProvider,
  ProviderFactory
} from '@atlaskit/editor-common'
import MentionIcon from '@atlaskit/icon/glyph/editor/mention'
import {
  MentionDescription,
  MentionItem,
  MentionProvider
} from '@atlaskit/mention'
import { Plugin, PluginKey, StateField } from 'prosemirror-state'
import * as React from 'react'
import uuid from 'uuid'
import { Dispatch } from '../../event-dispatcher'
import { ReactNodeView } from '../../nodeviews'
import { Command, EditorAppearance, EditorPlugin } from '../../types'
import { PortalProviderAPI } from '../../ui/PortalProvider'
import WithPluginState from '../../ui/WithPluginState'
import { messages } from '../insert-block/ui/ToolbarInsertBlock'
import {
  createInitialPluginState,
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState
} from '../type-ahead/pm-plugins/main'
import { buildTypeAheadRenderedPayload } from './analytics'
import mentionNodeView from './nodeviews/mention'
import ToolbarMention from './ui/ToolbarMention'

const mentionsPlugin = (): // createAnalyticsEvent?: CreateUIAnalyticsEventSignature
EditorPlugin => {
  let sessionId = uuid()
  const fireEvent = () => {}
  // <T extends AnalyticsEventPayload>(payload: T): void => {
  //   if (createAnalyticsEvent) {
  //     if (payload.attributes && !payload.attributes.sessionId) {
  //       payload.attributes.sessionId = sessionId
  //     }
  //     createAnalyticsEvent(payload).fire(ELEMENTS_CHANNEL)
  //   }
  // }

  return {
    nodes() {
      return [{ name: 'mention', node: mention }]
    },

    pmPlugins() {
      return [
        {
          name: 'mention',
          plugin: ({ providerFactory, dispatch, portalProviderAPI, props }) =>
            mentionPluginFactory(
              dispatch,
              providerFactory,
              portalProviderAPI,
              fireEvent,
              props.appearance
            )
        }
      ]
    },

    secondaryToolbarComponent({ editorView, disabled }) {
      return (
        <WithPluginState
          editorView={editorView}
          plugins={{
            typeAheadState: typeAheadPluginKey,
            mentionState: mentionPluginKey
          }}
          render={({
            typeAheadState = createInitialPluginState(),
            mentionState = {}
          }: {
            typeAheadState: TypeAheadPluginState
            mentionState: MentionPluginState
          }) =>
            !mentionState.provider ? null : (
              <ToolbarMention
                editorView={editorView}
                isDisabled={disabled || !typeAheadState.isAllowed}
              />
            )
          }
        />
      )
    },

    pluginsOptions: {
      quickInsert: ({ formatMessage }) => [
        {
          title: formatMessage(messages.mention),
          priority: 400,
          icon: () => <MentionIcon label={formatMessage(messages.mention)} />,
          action(insert, state) {
            const mark = state.schema.mark('typeAheadQuery', {
              trigger: '@'
            })
            const mentionText = state.schema.text('@', [mark])
            return insert(mentionText)
          }
        }
      ],
      typeAhead: {
        trigger: '@',
        // Custom regex must have a capture group around trigger
        // so it's possible to use it without needing to scan through all triggers again
        customRegex: '\\(?(@)',
        getItems(query, state, intl, { prevActive, queryChanged }) {
          const pluginState = getMentionPluginState(state)
          const mentions =
            !prevActive && queryChanged ? [] : pluginState.mentions || []

          if (queryChanged && pluginState.provider) {
            pluginState.provider.filter(query || '')
          }

          return mentions.map(mention => ({
            title: mention.id,
            render: ({ isSelected, onClick, onMouseMove }) => (
              <MentionItem
                mention={mention}
                selected={isSelected}
                onMouseMove={onMouseMove}
                onSelection={onClick}
              />
            ),
            mention
          }))
        },
        selectItem(state, item, insert, { mode }) {
          const pluginState = getMentionPluginState(state)
          const { id, name, nickname, accessLevel, userType } = item.mention
          const renderName = nickname ? nickname : name
          const typeAheadPluginState = typeAheadPluginKey.getState(
            state
          ) as TypeAheadPluginState

          const pickerElapsedTime = typeAheadPluginState.queryStarted
            ? Date.now() - typeAheadPluginState.queryStarted
            : 0

          // fireEvent(
          //   buildTypeAheadInsertedPayload(
          //     pickerElapsedTime,
          //     typeAheadPluginState.upKeyCount,
          //     typeAheadPluginState.downKeyCount,
          //     sessionId,
          //     mode,
          //     item.mention,
          //     pluginState.mentions,
          //     typeAheadPluginState.query || ''
          //   )
          // )

          sessionId = uuid()

          return insert(
            state.schema.nodes.mention.createChecked({
              text: `@${renderName}`,
              id,
              accessLevel,
              userType: userType === 'DEFAULT' ? null : userType
            })
          )
        },
        dismiss(state) {
          const typeAheadPluginState = typeAheadPluginKey.getState(
            state
          ) as TypeAheadPluginState

          const pickerElapsedTime = typeAheadPluginState.queryStarted
            ? Date.now() - typeAheadPluginState.queryStarted
            : 0

          // fireEvent(
          //   buildTypeAheadCancelPayload(
          //     pickerElapsedTime,
          //     typeAheadPluginState.upKeyCount,
          //     typeAheadPluginState.downKeyCount,
          //     sessionId,
          //     typeAheadPluginState.query || ''
          //   )
          // )

          sessionId = uuid()
        }
      }
    }
  }
}

export default mentionsPlugin

/**
 * Actions
 */

export const ACTIONS = {
  SET_PROVIDER: 'SET_PROVIDER',
  SET_RESULTS: 'SET_RESULTS',
  SET_CONTEXT: 'SET_CONTEXT'
}

export const setProvider = (provider): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(mentionPluginKey, {
        action: ACTIONS.SET_PROVIDER,
        params: { provider }
      })
    )
  }
  return true
}

export const setResults = (results): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(mentionPluginKey, {
        action: ACTIONS.SET_RESULTS,
        params: { results }
      })
    )
  }
  return true
}

export const setContext = (context): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(mentionPluginKey, {
        action: ACTIONS.SET_CONTEXT,
        params: { context }
      })
    )
  }
  return true
}

/**
 *
 * ProseMirror Plugin
 *
 */

export const mentionPluginKey = new PluginKey('mentionPlugin')

export function getMentionPluginState(state) {
  return mentionPluginKey.getState(state) as MentionPluginState
}

export type MentionPluginState = {
  provider?: MentionProvider
  contextIdentifier?: ContextIdentifierProvider
  mentions?: Array<MentionDescription>
}

function mentionPluginFactory(
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  portalProviderAPI: PortalProviderAPI,
  fireEvent: (payload: any) => void,
  editorAppearance?: EditorAppearance
) {
  let mentionProvider: MentionProvider

  return new Plugin({
    key: mentionPluginKey,
    state: {
      init() {
        return {}
      },
      apply(tr, pluginState) {
        const { action, params } = tr.getMeta(mentionPluginKey) || {
          action: null,
          params: null
        }

        let newPluginState = pluginState

        switch (action) {
          case ACTIONS.SET_PROVIDER:
            newPluginState = {
              ...pluginState,
              provider: params.provider
            }
            dispatch(mentionPluginKey, newPluginState)
            return newPluginState

          case ACTIONS.SET_RESULTS:
            newPluginState = {
              ...pluginState,
              mentions: params.results
            }
            dispatch(mentionPluginKey, newPluginState)
            return newPluginState

          case ACTIONS.SET_CONTEXT:
            newPluginState = {
              ...pluginState,
              contextIdentifier: params.context
            }
            dispatch(mentionPluginKey, newPluginState)
            return newPluginState
        }

        return newPluginState
      }
    } as StateField<MentionPluginState>,
    //@ts-ignore
    props: {
      nodeViews: {
        mention: ReactNodeView.fromComponent(
          mentionNodeView,
          portalProviderAPI,
          { providerFactory, editorAppearance }
        )
      }
    },
    view(editorView) {
      const providerHandler = (
        name: string,
        providerPromise?: Promise<MentionProvider | ContextIdentifierProvider>
      ) => {
        switch (name) {
          case 'mentionProvider':
            if (!providerPromise) {
              return setProvider(undefined)(
                editorView.state,
                editorView.dispatch
              )
            }

            ;(providerPromise as Promise<MentionProvider>)
              .then(provider => {
                if (mentionProvider) {
                  mentionProvider.unsubscribe('mentionPlugin')
                }

                mentionProvider = provider
                setProvider(provider)(editorView.state, editorView.dispatch)

                provider.subscribe(
                  'mentionPlugin',
                  (mentions, query, stats) => {
                    setResults(mentions)(editorView.state, editorView.dispatch)

                    fireEvent(
                      buildTypeAheadRenderedPayload(
                        stats && stats.duration,
                        mentions.map(mention => mention.id),
                        query || ''
                      )
                    )
                  }
                )
              })
              .catch(() =>
                setProvider(undefined)(editorView.state, editorView.dispatch)
              )
            break

          case 'contextIdentifierProvider':
            if (!providerPromise) {
              return setContext(undefined)(
                editorView.state,
                editorView.dispatch
              )
            }
            ;(providerPromise as Promise<ContextIdentifierProvider>).then(
              provider => {
                setContext(provider)(editorView.state, editorView.dispatch)
              }
            )
            break
        }
      }

      providerFactory.subscribe('mentionProvider', providerHandler)
      providerFactory.subscribe('contextIdentifierProvider', providerHandler)

      return {
        destroy() {
          if (providerFactory) {
            providerFactory.unsubscribe('mentionProvider', providerHandler)
            providerFactory.unsubscribe(
              'contextIdentifierProvider',
              providerHandler
            )
          }
          if (mentionProvider) {
            mentionProvider.unsubscribe('mentionPlugin')
          }
        }
      }
    }
  })
}
