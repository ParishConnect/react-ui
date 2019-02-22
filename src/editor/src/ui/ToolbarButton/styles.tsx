import React from 'react'
import { Button, IconButton } from '../../../../buttons/index'
import { majorScale, minorScale } from '../../../../scales/index'

export const ToolbarButtonFactory = (props: any) => {
  if (props.isIconButton && props.icon)
    return <IconButton paddingX={majorScale(1)} marginX={2} {...props} />
  return <Button paddingX={majorScale(1)} marginX={2} {...props} />
}
