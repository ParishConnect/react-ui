/**
 * Theme
 * ---
 * The theme object is used to style Aluminum.
 * It is passed into the  `<ThemeProvider theme={theme} />`.
 * ----
 * You can use this as a template for your own themes.
 */

/**
 * Foundational Styles.
 * ---
 * The following properties are NOT REQUIRED by Aluminum.
 * It's exposed for convenience and documentation.
 */
/**
 * Component Specific.
 * ---
 * These ARE REQUIRED for Aluminum to work.
 */
import {
  avatarColors,
  badgeColors,
  getAlertProps,
  getAvatarInitialsFontSize,
  getAvatarProps,
  getBadgeProps,
  getButtonCSS,
  getCheckboxCSS,
  getCodeProps,
  getLinkCSS,
  getMenuItemCSS,
  getRadioCSS,
  getRowCSS,
  getSegmentedControlRadioCSS,
  getSelectCSS,
  getSwitchCSS,
  getTabCSS,
  getTableCellCSS,
  getTextareaCSS,
  getTextDropdownButtonCSS,
  getTextInputCSS,
  getTooltipProps,
  overlayBackgroundColor,
  spinnerColor
} from './component-specific/'
import {
  colors,
  elevations,
  fills,
  gradients,
  palette,
  scales
} from './foundational-styles/'
/**
 * Theme Helpers.
 * ---
 * These ARE REQUIRED for Aluminum to work.
 */
import {
  getBackground,
  getBorderRadiusForControlHeight,
  getElevation,
  getFontFamily,
  getHeadingStyle,
  getIconColor,
  getIconForIntent,
  getIconSizeForButton,
  getIconSizeForIconButton,
  getIconSizeForInput,
  getIconSizeForSelect,
  getParagraphStyle,
  getTextColor,
  getTextSizeForBlockHeight,
  getTextSizeForControlHeight,
  getTextStyle,
  getThemeColor,
  isThemeColor
} from './theme-helpers/'
/**
 * Typography.
 * ---
 * The following properties are NOT REQUIRED by Aluminum.
 * It's exposed for convenience and documentation.
 */
import { fontFamilies, headings, paragraph, text } from './typography/'

export default {
  // Theme Color
  themeColor: 'teal',
  toasterPosition: 'right',
  // Foundational Styles.
  colors,
  elevations,
  gradients,
  fills,
  palette,
  scales,

  // Component Specific.
  avatarColors,
  badgeColors,
  spinnerColor,
  overlayBackgroundColor,
  getButtonCSS,
  getLinkCSS,
  getCheckboxCSS,
  getRadioCSS,
  getTextInputCSS,
  getTextareaCSS,
  getTextDropdownButtonCSS,
  getTabCSS,
  getTableCellCSS,
  getTooltipProps,
  getRowCSS,
  getMenuItemCSS,
  getSelectCSS,
  getSegmentedControlRadioCSS,
  getSwitchCSS,
  getAlertProps,
  getCodeProps,
  getAvatarProps,
  getBadgeProps,
  getAvatarInitialsFontSize,

  // Theme Helpers.
  getBorderRadiusForControlHeight,
  getTextSizeForControlHeight,
  getTextSizeForBlockHeight,
  getIconSizeForButton,
  getIconSizeForInput,
  getIconSizeForSelect,
  getIconSizeForIconButton,
  getBackground,
  getElevation,
  getIconColor,
  getIconForIntent,
  getHeadingStyle,
  getTextStyle,
  getParagraphStyle,
  getFontFamily,
  getTextColor,
  isThemeColor,
  getThemeColor,

  typography: {
    headings,
    text,
    fontFamilies,
    paragraph
  }
}
