import { setParentNodeMarkup, removeParentNodeOfType } from 'prosemirror-utils'
import { PanelType } from '@atlaskit/adf-schema'

import { Command } from '../../types'

export type DomAtPos = (pos: number) => { node: HTMLElement; offset: number }

export const removePanel = (): Command => (state, dispatch) => {
  const {
    schema: { nodes },
    tr
  } = state

  if (dispatch) {
    dispatch(removeParentNodeOfType(nodes.panel)(tr))
  }
  return true
}

export const changePanelType = (panelType: PanelType): Command => (
  state,
  dispatch
) => {
  const {
    schema: { nodes },
    tr
  } = state

  if (dispatch) {
    dispatch(setParentNodeMarkup(nodes.panel, null, { panelType })(tr))
  }
  return true
}
