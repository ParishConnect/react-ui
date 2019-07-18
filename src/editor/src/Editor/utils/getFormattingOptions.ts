import { FormattingOptions } from '../types'

export default function getFormattingOptions(
  formattingOptions: FormattingOptions = {
    bold: true,
    italic: true,
    underline: true,
    blockquote: true,
    heading: true,
    link: true
  }
) {
  const {
    bold = true,
    italic = true,
    underline = true,
    blockquote = true,
    heading = true,
    link = true
  } = formattingOptions

  return {
    bold,
    italic,
    underline,
    blockquote,
    heading,
    link
  }
}
