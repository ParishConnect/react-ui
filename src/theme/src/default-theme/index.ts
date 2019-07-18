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
import {
  colors,
  elevations,
  gradients,
  fills,
  palette,
  scales
} from './foundational-styles/'

/**
 * Typography.
 * ---
 * The following properties are NOT REQUIRED by Aluminum.
 * It's exposed for convenience and documentation.
 */
import { headings, text, fontFamilies, paragraph } from './typography/'

/**
 * Component Specific.
 * ---
 * These ARE REQUIRED for Aluminum to work.
 */
import {
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
  getAvatarInitialsFontSize
} from './component-specific/'

/**
 * Theme Helpers.
 * ---
 * These ARE REQUIRED for Aluminum to work.
 */
import {
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
  getThemeColor
} from './theme-helpers/'

export default {
  // Theme Color
  themeColor: 'blue',
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
