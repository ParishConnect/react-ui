import { splitBoxProps } from '@parishconnect/box'
import React, { ReactChild, useMemo, useRef, useState } from 'react'
import Plain from 'slate-plain-serializer'
import { Editor, EditorProps } from 'slate-react'
import { Pane, PaneProps } from '../../../layers/index'
import { basePlugin } from './plugins'

type BaseEditorProps = PaneProps &
  Partial<EditorProps> & {
    renderToolbar?: (editor: Editor | null) => ReactChild
  }

const basePlugins = [basePlugin()]

export const BaseEditor = ({
  value,
  plugins = [],
  renderToolbar,
  ...rest
}: BaseEditorProps) => {
  const [stateValue, setStateValue] = useState(value)
  // const editorRef = useRef<Editor | null>(null)
  // const { matched, remaining } = splitBoxProps(rest as any)

  const memoPlugins = useMemo(() => [...plugins, ...basePlugins], [plugins])

  const onChange = (change: any) => setStateValue(change.value)

  return (
    <Editor
      // ref={editorRef}
      plugins={memoPlugins}
      value={stateValue!}
      onChange={onChange}
      // renderEditor={(_, editor, next) => (
      //   <Pane {...matched}>
      //     {renderToolbar && renderToolbar(editorRef)}
      //     {next()}
      //   </Pane>
      // )}
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
