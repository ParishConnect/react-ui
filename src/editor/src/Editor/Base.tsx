import React, { useState } from 'react'
import Plain from 'slate-plain-serializer'
import { Editor, EditorProps } from 'slate-react'
import { Pane, PaneProps } from '../../../layers/index'
import { basePlugin } from './plugins'

type BaseEditorProps = PaneProps & Partial<EditorProps>

const basePlugins = [basePlugin()]

export const BaseEditor = ({
  value,
  plugins = [],
  ...rest
}: BaseEditorProps) => {
  const [stateValue, setStateValue] = useState(value)

  const onChange = (change: any) => setStateValue(change.value)

  return (
    <Pane
      is={Editor}
      plugins={[...basePlugins, ...plugins]}
      value={stateValue}
      onChange={onChange}
      {...rest}
    />
  )
}

BaseEditor.defaultProps = {
  autoCorrect: true,
  autoFocus: false,
  placeholder: 'Enter some text...',
  value: Plain.deserialize(''),
  spellCheck: true
} as BaseEditorProps
