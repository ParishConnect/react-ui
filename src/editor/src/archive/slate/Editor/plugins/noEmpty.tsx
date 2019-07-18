import { Value } from 'slate'
import Plain from 'slate-plain-serializer'

export function noEmpty() {
  const onBeforeChange = (state: Value) => {
    const { document } = state

    if (!document.nodes.isEmpty()) {
      return
    }

    return Value.create(Plain.deserialize(''))
  }
  return {
    onBeforeChange
  }
}
