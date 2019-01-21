export default function manageTableRowFocusInteraction(key: any, ref: any) {
  let nextItemToFocus: any
  const tableBodyChildren = Array.from(ref.parentElement.children)
  const rowIndex = tableBodyChildren.indexOf(ref)

  if (key === 'ArrowUp' && rowIndex - 1 >= 0) {
    nextItemToFocus = tableBodyChildren[rowIndex - 1]
  } else if (key === 'ArrowDown' && rowIndex + 1 < tableBodyChildren.length) {
    nextItemToFocus = tableBodyChildren[rowIndex + 1]
  }

  if (nextItemToFocus && nextItemToFocus.hasAttribute('tabindex')) {
    nextItemToFocus.focus()
  }
}
