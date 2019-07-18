import React from 'react'
import { Text } from '../../../../typography/index'
import { TextSize } from '../../../../typography/src/Text'

export function basePlugin(size: TextSize = 400) {
  return {
    renderEditor(_, __, next: any) {
      const children = next()

      return <Text size={size}>{children}</Text>
    }
  }
}
