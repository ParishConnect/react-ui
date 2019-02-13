// @ts-ignore: unused variable
import { css } from 'styled-components'
import {
  blockquoteSharedStyles,
  headingsSharedStyles
} from '@atlaskit/editor-common'
import { majorScale } from '../../../../scales/index'

export const blocktypeStyles = css`
  .ProseMirror {
    & blockquote {
      box-sizing: border-box;
      border-top: solid 2px #ddebf7;
      border-bottom: solid 2px #ddebf7;
      padding: ${majorScale(1)}px ${majorScale(12)}px;
      font-size: 24px;
      margin: 1.142em ${majorScale(12)}px 0;

      [dir='rtl'] & {
        padding-left: 0;
        padding-right: ${majorScale(2)}px;
      }

      &:first-child {
        margin-top: 0;
      }

      &::before {
        content: '';
      }

      &::after {
        content: none;
      }

      & p {
        display: block;
      }
    }
    ${headingsSharedStyles};
  }
`
