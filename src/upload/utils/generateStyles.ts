import { css } from 'emotion'
import { ThemeType } from '../../constants/index'
import { colors } from '../../theme/src/default-theme/foundational-styles/index'

export const generateStyles = (theme: ThemeType) => {
  return css({
    '.filepond--image-preview-overlay-success': {
      color: colors.intent.success
    }
  })
}
