// @ts-ignore: unused variable
import { blockquoteSharedStyles } from '@atlaskit/editor-common'
import { css } from 'styled-components'
import { defaultTheme } from '../../../../theme'

export const blocktypeStyles = css`
  .ProseMirror {
    ${blockquoteSharedStyles};
    & h1 {
      font-size: 29px;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: -0.2px;
      margin-top: 40px;
      font-family: ${defaultTheme.typography.fontFamilies.display};
      color: ${defaultTheme.colors.text.dark};
    }
    & h2 {
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.07px;
      margin-top: 28px;
      font-family: ${defaultTheme.typography.fontFamilies.display};
      color: ${defaultTheme.colors.text.dark};
    }
  }
`
