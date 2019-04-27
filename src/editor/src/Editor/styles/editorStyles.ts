import { EDITOR_CLASS_SELECTOR } from '@remirror/core'
import { css } from 'emotion'
import tinycolor from 'tinycolor2'
import { ThemeType } from '../../../../constants/index'
import { majorScale } from '../../../../scales/index'
import { defaultTheme } from '../../../../theme/index'
import {
  headings,
  text
} from '../../../../theme/src/default-theme/typography/index'

export default function editorStyles(theme: ThemeType) {
  return css({
    [`${EDITOR_CLASS_SELECTOR}`]: {
      maxWidth: 800,
      margin: '0 auto',
      outline: 'none',
      padding: majorScale(4),
      color: defaultTheme.getTextColor('default', theme),
      fontFamily: defaultTheme.getFontFamily('display'),
      ...defaultTheme.getTextStyle(400),
      // Strong
      strong: {
        ...text[400],
        fontWeight: 600
      },
      // Heading
      h1: headings[700],
      h2: headings[500],
      // Paragraph text
      'p, span, div': {
        ...text[400],
        clear: 'none'
      },
      // Links
      a: {
        cursor: 'pointer',
        color: theme.getThemeColor(theme),
        '&:hover': {
          color: tinycolor(theme.getThemeColor(theme))
            .lighten(10)
            .toString()
        },
        '&:active': {
          color: tinycolor(theme.getThemeColor(theme))
            .darken(10)
            .toString()
        },
        '&:focus': {
          boxShadow: `0 0 0 2px ${tinycolor(theme.getThemeColor(theme))
            .setAlpha(0.4)
            .toString()}`
        }
      },

      // Images
      img: {
        borderRadius: 3,
        maxWidth: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        marginLeft: majorScale(1),
        marginRight: majorScale(1),
        marginTop: majorScale(1),
        '&.ProseMirror-selectednode': {
          boxShadow: `0 0 0 2px ${theme.getThemeColor(theme)}`
        },
        '&[layout="center"]': {
          marginRight: 'auto',
          marginLeft: 'auto',
          display: 'flex'
        },
        '&[layout="align-start"]': {
          marginRight: 'auto',
          display: 'flex'
        },
        '&[layout="align-end"]': {
          marginLeft: 'auto',
          display: 'flex'
        },
        '&[layout="wrap-start"] img': {
          float: 'left'
        },
        '&[layout="wrap-end"] img': {
          float: 'right'
        },
        '&[width="50%"]': {
          maxWidth: '50%',
          width: majorScale(40)
        },
        '&[width="100%"]': {
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: majorScale(1),
          width: '100%'
        }
      }
    }
  })
}
