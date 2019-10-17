import {
  colors,
  palette
} from '../../theme/src/default-theme/foundational-styles'
import { LiteralUnion } from '../../utils/utils'

export type ThemeColor =
  | 'blue'
  | 'red'
  | 'purple'
  | 'neutral'
  | 'orange'
  | 'green'
  | 'teal'

export type BackgroundTint =
  | 'tint1'
  | 'tint2'
  | 'overlay'
  | 'yellowTint'
  | 'greenTint'
  | 'orangeTint'
  | 'redTint'
  | 'blueTint'
  | 'purpleTint'
  | 'tealTint'

export type BackgroundColor = LiteralUnion<
  | BackgroundTint
  | 'neutral'
  | 'green'
  | 'orange'
  | 'red'
  | 'blue'
  | 'purple'
  | 'teal'
>

export type BorderColor = LiteralUnion<'default' | 'muted'>

export type Elevation = 0 | 1 | 2 | 3 | 4

export interface Colors {
  background: BackgroundColor
  border: BorderColor
  text: object
  icon: object
  intent: {
    none: string
    success: string
    danger: string
    warning: string
  }
}

export interface ThemeType {
  /**
   * default 'blue'
   */
  themeColor: string
  colors: typeof colors
  elevations: object
  gradients: object
  fills: object
  palette: typeof palette
  scales: object

  // Component Specific.
  avatarColors: object
  badgeColors: object
  spinnerColor: string | undefined
  overlayBackgroundColor: string
  getButtonCSS: Function
  getLinkCSS: Function
  getCheckboxCSS: Function
  getRadioCSS: Function
  getTextInputCSS: Function
  getTextareaCSS: Function
  getTextDropdownButtonCSS: Function
  getTabCSS: Function
  getTableCellCSS: Function
  getTooltipProps: Function
  getRowCSS: Function
  getMenuItemCSS: Function
  getSelectCSS: Function
  getSegmentedControlRadioCSS: Function
  getSwitchCSS: Function
  getAlertProps: Function
  getCodeProps: Function
  getAvatarProps: Function
  getBadgeProps: Function
  getAvatarInitialsFontSize: Function

  // Theme Helpers.
  getBorderRadiusForControlHeight: Function
  getTextSizeForControlHeight: Function
  getTextSizeForBlockHeight: Function
  getIconSizeForButton: Function
  getIconSizeForInput: Function
  getIconSizeForSelect: Function
  getIconSizeForIconButton: Function
  getBackground: Function
  getElevation: Function
  getIconColor: Function
  getIconForIntent: Function
  getHeadingStyle: Function
  getTextStyle: Function
  getParagraphStyle: Function
  getFontFamily: Function
  getTextColor: Function
  isThemeColor: Function
  getThemeColor: Function

  typography: {
    headings: object
    text: object
    fontFamilies: object
    paragraph: object
  }
}
