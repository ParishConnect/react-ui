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

export type BackgroundColor =
  | BackgroundTint
  | 'neutral'
  | 'green'
  | 'orange'
  | 'red'
  | 'blue'
  | 'purple'
  | 'teal'

export interface BorderColor {
  default: 'default'
  muted: 'muted'
}

export type Elevation = 0 | 1 | 2 | 3 | 4 | number | undefined

export interface Colors {
  background: BackgroundColor | string
  border: BorderColor
  text: object
  icon: object
  intent: object
}

export interface ThemeType {
  /**
   * default 'blue'
   */
  themeColor: string
  colors: Colors
  elevations: object
  gradients: object
  fills: object
  palette: object
  scales: object

  // Component Specific.
  avatarColors: object
  badgeColors: object
  spinnerColor: string | undefined
  overlayBackgroundColor: string
  getButtonClassName: Function
  getLinkClassName: Function
  getCheckboxClassName: Function
  getRadioClassName: Function
  getTextInputClassName: Function
  getTextareaClassName: Function
  getTextDropdownButtonClassName: Function
  getTabClassName: Function
  getTableCellClassName: Function
  getTooltipProps: Function
  getRowClassName: Function
  getMenuItemClassName: Function
  getSelectClassName: Function
  getSegmentedControlRadioClassName: Function
  getSwitchClassName: Function
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
