/**
 * Theme
 * ---
 * The theme object is used to style Evergreen.
 * It is passed into the  `<ThemeProvider theme={theme} />`.
 * ----
 * You can use this as a template for your own themes.
 */

/**
 * Foundational Styles.
 * ---
 * The following properties are NOT REQUIRED by Evergreen.
 * It's exposed for convenience and documentation.
 */
/**
 * Component Specific.
 * ---
 * These ARE REQUIRED for Evergreen to work.
 */
import {
  avatarColors,
  badgeColors,
  getAlertProps,
  getAvatarInitialsFontSize,
  getAvatarProps,
  getBadgeProps,
  getButtonClassName,
  getCheckboxClassName,
  getCodeProps,
  getLinkClassName,
  getMenuItemClassName,
  getRadioClassName,
  getRowClassName,
  getSegmentedControlRadioClassName,
  getSelectClassName,
  getSwitchClassName,
  getTabClassName,
  getTableCellClassName,
  getTextareaClassName,
  getTextDropdownButtonClassName,
  getTextInputClassName,
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
 * These ARE REQUIRED for Evergreen to work.
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
 * The following properties are NOT REQUIRED by Evergreen.
 * It's exposed for convenience and documentation.
 */
import { fontFamilies, headings, paragraph, text } from './typography/'

export default {
  // Theme Color
  themeColor: 'blue',
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
  getButtonClassName,
  getLinkClassName,
  getCheckboxClassName,
  getRadioClassName,
  getTextInputClassName,
  getTextareaClassName,
  getTextDropdownButtonClassName,
  getTabClassName,
  getTableCellClassName,
  getTooltipProps,
  getRowClassName,
  getMenuItemClassName,
  getSelectClassName,
  getSegmentedControlRadioClassName,
  getSwitchClassName,
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
