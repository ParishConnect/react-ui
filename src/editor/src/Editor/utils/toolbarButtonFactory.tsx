import * as React from 'react'
import { IconButton } from '../../../../buttons/index'
import {
  BoldIcon,
  HeadingOneIcon,
  HeadingTwoIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  QuoteIcon,
  UnderlineIcon
} from '../../../../icons/index'
import { runAction } from './runAction'

export const getTextButtons = ({
  formattingOptions: { bold, italic, underline },
  actions,
  disabled
}) => {
  const textButtons: JSX.Element[] = []
  const buttonProps = { marginX: 2, disabled }

  if (actions.bold && bold) {
    textButtons.push(
      <IconButton
        key="bold"
        appearance="minimal"
        isActive={actions.bold.isActive()}
        icon={BoldIcon}
        disabled={!actions.bold.isEnabled}
        onClick={runAction(actions.bold.command)}
        {...buttonProps}
      />
    )
  }
  if (actions.italic && italic) {
    textButtons.push(
      <IconButton
        key="italic"
        appearance="minimal"
        isActive={actions.italic.isActive()}
        icon={ItalicIcon}
        disabled={!actions.italic.isEnabled}
        onClick={runAction(actions.italic.command)}
        {...buttonProps}
      />
    )
  }
  if (actions.underline && underline) {
    textButtons.push(
      <IconButton
        key="underline"
        appearance="minimal"
        isActive={actions.underline.isActive()}
        icon={UnderlineIcon}
        disabled={!actions.underline.isEnabled}
        onClick={runAction(actions.underline.command)}
        {...buttonProps}
      />
    )
  }
  return textButtons
}

export const getBlockButtons = ({
  formattingOptions: { blockquote, link },
  actions,
  disabled,
  allowImages,
  openUploadPane,
  linkActivated,
  deactivateLink,
  activateLink
}) => {
  const blockButtons: JSX.Element[] = []
  const buttonProps = { marginX: 2, disabled }
  if (allowImages) {
    blockButtons.push(
      <IconButton
        key="upload"
        onClick={openUploadPane}
        appearance="minimal"
        icon={ImageIcon}
        {...buttonProps}
      />
    )
  }

  if (actions.blockquote && blockquote) {
    blockButtons.push(
      <IconButton
        key="blockquote"
        appearance="minimal"
        isActive={actions.blockquote.isActive()}
        icon={QuoteIcon}
        disabled={!actions.blockquote.isEnabled}
        onClick={runAction(actions.blockquote.command)}
        {...buttonProps}
      />
    )
  }

  if (actions.removeLink && link) {
    blockButtons.push(
      <IconButton
        key="link"
        appearance="minimal"
        isActive={linkActivated}
        icon={LinkIcon}
        disabled={!actions.removeLink.isActive}
        onClick={linkActivated ? deactivateLink : activateLink}
        {...buttonProps}
      />
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
  if (actions.toggleHeading && heading) {
    blockButtons.push(
      <IconButton
        key="heading1"
        appearance="minimal"
        isActive={actions.toggleHeading.isActive({ level: 1 })}
        icon={HeadingOneIcon}
        disabled={!actions.toggleHeading.isEnabled}
        onClick={runAction(actions.toggleHeading, { level: 1 })}
        {...buttonProps}
      />
    )
    blockButtons.push(
      <IconButton
        key="heading2"
        appearance="minimal"
        isActive={actions.toggleHeading.isActive({ level: 2 })}
        icon={HeadingTwoIcon}
        disabled={!actions.toggleHeading.isEnabled}
        onClick={runAction(actions.toggleHeading, { level: 2 })}
        {...buttonProps}
      />
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
