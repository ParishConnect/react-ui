import {
  BlockquoteExtension,
  BoldExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  LinkExtensionOptions,
  UnderlineExtension,
  SSRHelperExtension
} from '@remirror/core-extensions'
import { RemirrorExtension } from '@remirror/react'
import * as React from 'react'
import { FormattingOptions } from '../types'

export default (
  formattingOptions: FormattingOptions,
  activateLink: () => void
) => {
  const {
    bold,
    italic,
    underline,
    blockquote,
    heading,
    link
  } = formattingOptions
  const formattingExtensions: JSX.Element[] = []

  formattingExtensions.push(
    <RemirrorExtension
      key={SSRHelperExtension.name}
      Constructor={SSRHelperExtension}
    />
  )

  if (bold) {
    formattingExtensions.push(
      <RemirrorExtension key={BoldExtension.name} Constructor={BoldExtension} />
    )
  }
  if (italic) {
    formattingExtensions.push(
      <RemirrorExtension
        key={ItalicExtension.name}
        Constructor={ItalicExtension}
      />
    )
  }
  if (underline) {
    formattingExtensions.push(
      <RemirrorExtension
        key={UnderlineExtension.name}
        Constructor={UnderlineExtension}
      />
    )
  }
  if (blockquote) {
    formattingExtensions.push(
      <RemirrorExtension
        key={BlockquoteExtension.name}
        Constructor={BlockquoteExtension}
      />
    )
  }
  if (heading) {
    formattingExtensions.push(
      <RemirrorExtension
        key={HeadingExtension.name}
        Constructor={HeadingExtension}
      />
    )
  }
  if (link) {
    formattingExtensions.push(
      <RemirrorExtension<LinkExtensionOptions>
        key={LinkExtension.name}
        Constructor={LinkExtension}
        activationHandler={activateLink}
      />
    )
  }

  return formattingExtensions
}
