import {
  Blockquote,
  Bold,
  Heading,
  Italic,
  Link,
  LinkOptions,
  Underline
} from '@remirror/core-extensions'
import { RemirrorExtension } from '@remirror/react'
import * as React from 'react'
import { FormattingOptions } from '../types'
import { Image } from '../plugins/Image'
import { MediaWrapper, MediaWrapperOptions } from '../plugins/MediaWrapper'

export default (
  formattingOptions: FormattingOptions,
  activateLink: () => void,
  activateImage: () => void
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

  if (bold) {
    formattingExtensions.push(
      <RemirrorExtension key={Bold.name} Constructor={Bold} />
    )
  }
  if (italic) {
    formattingExtensions.push(
      <RemirrorExtension key={Italic.name} Constructor={Italic} />
    )
  }
  if (underline) {
    formattingExtensions.push(
      <RemirrorExtension key={Underline.name} Constructor={Underline} />
    )
  }
  if (blockquote) {
    formattingExtensions.push(
      <RemirrorExtension key={Blockquote.name} Constructor={Blockquote} />
    )
  }
  if (heading) {
    formattingExtensions.push(
      <RemirrorExtension key={Heading.name} Constructor={Heading} />
    )
  }
  if (link) {
    formattingExtensions.push(
      <RemirrorExtension<LinkOptions>
        key={Link.name}
        Constructor={Link}
        activationHandler={activateLink}
      />
    )
  }

  formattingExtensions.push(
    <RemirrorExtension key={Image.name} Constructor={Image} />
  )

  return formattingExtensions
}
