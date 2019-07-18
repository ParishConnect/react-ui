import { Pane } from '../../../layers/index'
import React from 'react'
import { Editor } from 'slate-react'
import { IconButton } from '../../../index'
import { BoldIcon } from '../../../icons/index'

export const Toolbar = (editor: Editor) => {
  console.log(editor)

  return (
    <Pane>
      <IconButton
        disabled={!editor}
        icon={BoldIcon}
        onClick={() => editor.toggleMark('bold')}
      />
    </Pane>
  )
}
