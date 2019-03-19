import { ExtensionHandlers } from '@atlaskit/editor-common'
import { CardAppearance, Client, ResolveResponse } from '@atlaskit/smart-card'
import { EditorCardProvider } from '../src/smart-card'

const bibleUrlMatch = /https?\:\/\/bible-kit-prod\.herokuapp\.com\/v1\/.*/i

/**
 * This class is responsible for telling the editor which URLs
 * can be converted to a card.
 */
export class BibleCardProvider extends EditorCardProvider {
  /**
   * This method must resolve to a valid ADF that will be used to
   * replace a blue link after user pastes URL.
   *
   * @param url The pasted URL
   * @param appearance Appearance requested by the Editor
   */
  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    // This example uses a regex .match() but we could use a backend call here
    if (url.match(bibleUrlMatch)) {
      return {
        type: 'inlineCard',
        attrs: {
          url
        }
      }
    }

    // If the URL doesn't look like something we should handle, try native provider.
    return super.resolve(url, appearance)
  }
}

/**
 * A Client is responsible for resolving URL to JSON-LD with metadata
 */
export class BibleCardClient extends Client {
  fetchData(url: string): Promise<ResolveResponse> {
    if (!url.match(bibleUrlMatch)) {
      return super.fetchData(url)
    }

    return new Promise(resolve => {
      window
        .fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(res => res.json())
        .then(res =>
          resolve({
            meta: {
              visibility: 'restricted',
              access: 'granted',
              auth: [],
              definitionId: 'jira-native-resolve'
            },
            data: {
              '@context': {
                '@vocab': 'https://www.w3.org/ns/activitystreams#',
                schema: 'http://schema.org/'
              },
              '@type': ['bibleKit:Verse', 'Object'],
              name: res[0].value,
              tag: {
                name: 'Scripture'
              },
              url
            }
          })
        )
    })
  }
}

const FakeExtension = ({ colour, children }) => {
  return (
    <div
      style={{
        backgroundColor: colour,
        color: 'white',
        padding: 10,
        minWidth: 85
      }}
    >
      {children}
    </div>
  )
}

const InlineExtension = () => {
  return <FakeExtension colour="green">Inline extension demo</FakeExtension>
}

const BlockExtension = () => {
  return <FakeExtension colour="black">Block extension demo</FakeExtension>
}

const BodiedExtension = () => {
  return <FakeExtension colour="blue">Bodied extension demo</FakeExtension>
}

export const extensionHandlers: ExtensionHandlers = {
  'com.atlassian.confluence.macro.core': (ext, doc) => {
    const { extensionKey } = ext

    // using any here because most props are going to be injected through the extension handler
    // and typescript won't accept that as valid
    const macroProps: any = {
      node: ext
    }

    switch (extensionKey) {
      case 'block-eh':
        return <BlockExtension {...macroProps} />
      case 'bodied-eh':
        return <BodiedExtension {...macroProps} />
      case 'inline-eh':
        return <InlineExtension {...macroProps} />
    }

    return null
  }
}
