// @ts-ignore: unused variable
import { css } from 'styled-components'
import { blockquoteSharedStyles } from '@atlaskit/editor-common'
import { fontFamilies } from '../../../../theme/src/default-theme/typography/index'
import { colors } from '../../../../theme/src/default-theme/foundational-styles/index'

export const blocktypeStyles = css`
  .ProseMirror {
    ${blockquoteSharedStyles};
    & h1 {
      font-size: 29px;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: -0.2px;
      margin-top: 40px;
      font-family: ${fontFamilies.display};
      color: ${colors.text.dark};
    }
    & h2 {
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.07px;
      margin-top: 28px;
      font-family: ${fontFamilies.display};
      color: ${colors.text.dark};
    }
  }
`
