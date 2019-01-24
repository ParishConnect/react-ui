import {
  textblockTypeInputRule,
  wrappingInputRule,
  inputRules,
  // @ts-ignore
  InputRule
} from 'prosemirror-inputrules'
import { Schema, NodeType } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'

import {
  createInputRule,
  defaultInputRuleHandler,
  leafNodeReplacementCharacter,
  InputRuleWithHandler
} from '../../../utils/input-rules'
import {
  isConvertableToCodeBlock,
  transformToCodeBlockAction
} from '../commands/transform-to-code-block'
import { insertBlock } from '../commands/insert-block'
import { safeInsert } from 'prosemirror-utils'

export function headingRule(nodeType: NodeType, maxLevel: number) {
  return textblockTypeInputRule(
    new RegExp('^(#{1,' + maxLevel + '})\\s$'),
    nodeType,
    match => ({ level: match[1].length })
  ) as InputRuleWithHandler
}

export function blockQuoteRule(nodeType: NodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType) as InputRuleWithHandler
}

export function codeBlockRule(nodeType: NodeType) {
  return textblockTypeInputRule(/^```$/, nodeType)
}

export function inputRulePlugin(schema: Schema): Plugin | undefined {
  const rules: Array<InputRuleWithHandler> = []

  if (schema.nodes.heading) {
    // '# ' for h1, '## ' for h2 and etc
    const rule = defaultInputRuleHandler(
      headingRule(schema.nodes.heading, 6),
      true
    )
    const currentHandler = rule.handler
    rule.handler = (state, match, start, end) => {
      return currentHandler(state, match, start, end)
    }
    rules.push(rule)
    rules.push(
      createInputRule(
        new RegExp(`${leafNodeReplacementCharacter}(#{1,6})\\s$`),
        (state, match, start, end) => {
          const level = match[1].length
          return insertBlock(
            state,
            schema.nodes.heading,
            `heading${level}`,
            start,
            end,
            { level }
          )
        },
        true
      )
    )
  }

  if (schema.nodes.blockquote) {
    // '> ' for blockquote
    const rule = defaultInputRuleHandler(
      blockQuoteRule(schema.nodes.blockquote),
      true
    )
    rules.push(rule)
    rules.push(
      createInputRule(
        new RegExp(`${leafNodeReplacementCharacter}\\s*>\\s$`),
        (state, match, start, end) => {
          return insertBlock(
            state,
            schema.nodes.blockquote,
            'blockquote',
            start,
            end
          )
        },
        true
      )
    )
  }

  if (schema.nodes.codeBlock) {
    rules.push(
      createInputRule(
        /((^`{3,})|(\s`{3,}))(\S*)$/,
        (state, match, start, end) => {
          const attributes: any = {}
          if (match[4]) {
            attributes.language = match[4]
          }
          const newStart = match[0][0] === ' ' ? start + 1 : start
          if (isConvertableToCodeBlock(state)) {
            return (
              transformToCodeBlockAction(state, attributes)
                // remove markdown decorator ```
                .delete(newStart, end)
                .scrollIntoView()
            )
          }
          let { tr } = state
          tr = tr.delete(newStart, end)
          const codeBlock = state.schema.nodes.codeBlock.createChecked()
          return safeInsert(codeBlock)(tr)
        },
        true
      )
    )
    rules.push(
      createInputRule(
        new RegExp(
          `((${leafNodeReplacementCharacter}\`{3,})|(\\s\`{3,}))(\\S*)$`
        ),
        (state, match, start, end) => {
          const attributes: any = {}
          if (match[4]) {
            attributes.language = match[4]
          }
          return insertBlock(
            state,
            schema.nodes.codeBlock,
            'codeblock',
            start,
            end,
            attributes
          )
        },
        true
      )
    )
  }

  if (rules.length !== 0) {
    return inputRules({ rules })
  }
}

export default inputRulePlugin
