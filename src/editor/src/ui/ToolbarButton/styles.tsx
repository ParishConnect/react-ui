import React from 'react'
import { Button, IconButton } from '../../../../buttons/index'
import { majorScale } from '../../../../scales/index'
import { Tooltip } from '../../../../tooltip/index'

export const ToolbarButtonFactory = (props: any) => {
  const Component =
    props.isIconButton && props.icon ? (IconButton as any) : (Button as any)

  if (props.label && !props.hideTooltip) {
    return (
      <Tooltip content={props.label}>
        <Component paddingX={majorScale(1)} marginX={2} {...props} />
      </Tooltip>
    )
  }
}
