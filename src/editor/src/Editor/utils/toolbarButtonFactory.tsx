import * as React from 'react'
import { IconButton } from '../../../../buttons/index'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  QuoteIcon,
  LinkIcon,
  HeadingOneIcon,
  HeadingTwoIcon,
  ImageIcon
} from '../../../../icons/index'
import { runAction } from './runAction'
import { Tooltip } from '../../../../tooltip/index'

export const getTextButtons = ({
  formattingOptions: { bold, italic, underline },
  actions,
  disabled
}) => {
  const textButtons: JSX.Element[] = []
  const buttonProps = { marginX: 2, disabled }

  if (bold) {
    textButtons.push(
      <Tooltip position="top" content="Bold" key="Bold">
        <IconButton
          appearance="minimal"
          isActive={actions.bold.isActive()}
          icon={BoldIcon}
          disabled={!actions.bold.isEnabled}
          onClick={runAction(actions.bold.command)}
          {...buttonProps}
        />
      </Tooltip>
    )
  }
  if (italic) {
    textButtons.push(
      <Tooltip position="top" content="Italic" key="Italic">
        <IconButton
          appearance="minimal"
          isActive={actions.italic.isActive()}
          icon={ItalicIcon}
          disabled={!actions.italic.isEnabled}
          onClick={runAction(actions.italic.command)}
          {...buttonProps}
        />
      </Tooltip>
    )
  }
  if (underline) {
    textButtons.push(
      <Tooltip position="top" content="Underline" key="Underline">
        <IconButton
          appearance="minimal"
          isActive={actions.underline.isActive()}
          icon={UnderlineIcon}
          disabled={!actions.underline.isEnabled}
          onClick={runAction(actions.underline.command)}
          {...buttonProps}
        />
      </Tooltip>
    )
  }
  return textButtons
}

export const getBlockButtons = ({
  formattingOptions: { blockquote, link },
  actions,
  disabled,
  allowImages,
  linkActivated,
  deactivateLink,
  activateLink
}) => {
  const blockButtons: JSX.Element[] = []
  const buttonProps = { marginX: 2, disabled }
  if (allowImages) {
    blockButtons.push(
      <Tooltip position="top" content="Add Image" key="contentImage">
        <IconButton
          onClick={runAction(actions.imageAdd.command)}
          appearance="minimal"
          icon={ImageIcon}
          {...buttonProps}
        />
      </Tooltip>
    )
  }
  if (blockquote) {
    blockButtons.push(
      <Tooltip position="top" content="Blockquote" key="Blockquote">
        <IconButton
          appearance="minimal"
          isActive={actions.blockquote.isActive()}
          icon={QuoteIcon}
          disabled={!actions.blockquote.isEnabled}
          onClick={runAction(actions.blockquote.command)}
          {...buttonProps}
        />
      </Tooltip>
    )
  }
  if (link) {
    blockButtons.push(
      <Tooltip position="top" content="Hyperlink" key="Hyperlink">
        <IconButton
          appearance="minimal"
          isActive={linkActivated}
          icon={LinkIcon}
          disabled={!actions.linkRemove.isActive}
          onClick={linkActivated ? deactivateLink : activateLink}
          {...buttonProps}
        />
      </Tooltip>
    )
  }

  return blockButtons
}

export const getHeadingButtons = ({
  formattingOptions: { heading },
  actions,
  disabled
}) => {
  const blockButtons: JSX.Element[] = []
  const buttonProps = { marginX: 2, disabled }
  if (heading) {
    blockButtons.push(
      <Tooltip key="heading" position="top" content="Heading">
        <IconButton
          appearance="minimal"
          isActive={actions.heading.isActive({ level: 1 })}
          icon={HeadingOneIcon}
          disabled={!actions.heading.isEnabled}
          onClick={runAction(actions.heading.command, { level: 1 })}
          {...buttonProps}
        />
      </Tooltip>
    )
    blockButtons.push(
      <Tooltip key="subheading" position="top" content="Subheading">
        <IconButton
          appearance="minimal"
          isActive={actions.heading.isActive({ level: 2 })}
          icon={HeadingTwoIcon}
          disabled={!actions.heading.isEnabled}
          onClick={runAction(actions.heading.command, { level: 2 })}
          {...buttonProps}
        />
      </Tooltip>
    )
  }

  return blockButtons
}

export const hasTextButtons = ({
  formattingOptions: { bold, italic, underline }
}) => {
  if (bold || italic || underline) return true
}

export const hasBlockButtons = ({ formattingOptions: { blockquote } }) => {
  if (blockquote) return true
}

export const hasHeadingButtons = ({ formattingOptions: { heading } }) => {
  if (heading) return true
}
