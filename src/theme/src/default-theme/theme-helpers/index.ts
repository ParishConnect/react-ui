import { Intent, IntentType } from '../../../../constants'
import themedProperty from '../utils/themedProperty'
import { colors, elevations, palette } from '../foundational-styles/'
import { fontFamilies, headings, paragraph, text } from '../typography/'
import { ThemeType } from '../../../../constants/src/Theme'
import {
  CheckCircleIcon,
  AlertOctagonIcon,
  AlertTriangleIcon,
  InfoIcon
} from '../../../../icons/index'

const isThemeColor = (color: string): boolean => {
  if (color in palette) {
    return true
  }
  return false
}

function getThemeColor(theme: ThemeType, lightness?: any): string {
  if (!theme) {
    throw new Error('You must supply the theme to this helper method')
  }
  if (lightness) {
    return palette[theme.themeColor][lightness]
  }
  return palette[theme.themeColor].base
}

/**
 * Controls include:
 * - Button
 * - IconButton
 * - TextInput
 */
const getBorderRadiusForControlHeight = (height?: number): number => {
  if (height && height <= 40) {
    return 5
  }
  return 8
}

/**
 * Get the text size for a control with a certain height.
 */
const getTextSizeForControlHeight = (height?: number): number => {
  if (height) {
    if (height <= 24) return 300
    if (height <= 28) return 300
    if (height <= 32) return 300
    if (height <= 36) return 400
    if (height <= 40) return 400
    if (height <= 48) return 500
    if (height <= 56) return 700
  }

  return 800
}

/**
 * Get the text size for a block with a certain height. Used in larger UI Components like Banner and Pane
 */
const getTextSizeForBlockHeight = (height?: number): number => {
  if (height) {
    if (height <= 24) return 300
    if (height <= 50) return 300
    if (height <= 60) return 400
    if (height <= 70) return 400
    if (height <= 80) return 500
    if (height <= 90) return 600
    if (height <= 100) return 700
  }
  return 800
}

/**
 * Get the size for a icon in a Button with a certain height.
 */
const getIconSizeForButton = (height?: number): number => {
  if (height) {
    if (height <= 28) return 12
    if (height <= 32) return 12
    if (height <= 40) return 16
    if (height <= 48) return 18
  }
  return 20
}

// Use the same for input components.
const getIconSizeForInput = getIconSizeForButton
const getIconSizeForSelect = getIconSizeForButton

/**
 * Get the size for a icon in a IconButton with a certain height.
 */
const getIconSizeForIconButton = (height?: number): number => {
  if (height) {
    if (height <= 28) return 12
    if (height <= 32) return 14 // Slightly bigger than getIconSizeForButton
    if (height <= 40) return 16
    if (height <= 48) return 18
  }
  return 20
}

/**
 * Get background property.
 */
const getBackground = (background: string): string => {
  /**
   * Return one of theme presets or the original value.
   */
  return themedProperty(colors.background, background)
}

/**
 * Get box-shadow (elevation).
 */
const getElevation = (level: string, color = 'neutral'): string => {
  /**
   * There is no fallback, undefined will be returned.
   */
  return color in elevations
    ? elevations[color][level]
    : elevations.neutral[level]
}

/**
 * Get the color for an icon.
 */
const getIconColor = (color: string): string => {
  /**
   * Check if there is a preset in the theme for the icon color.
   */
  return themedProperty(colors.icon, color)
}

/**
 * Get the properties for an icon based on the intent.
 */
const getIconForIntent = (intent: IntentType, defaultColor?: string): any => {
  switch (intent) {
    case Intent.SUCCESS:
      return { icon: CheckCircleIcon, color: 'success' }
    case Intent.DANGER:
      return { icon: AlertOctagonIcon, color: 'danger' }
    case Intent.WARNING:
      return { icon: AlertTriangleIcon, color: 'warning' }
    case Intent.NONE:
    default:
      const color = !defaultColor
        ? 'info'
        : palette[defaultColor] && palette[defaultColor].base
      return {
        icon: InfoIcon,
        color
      }
  }
}

/**
 * Heading styles.
 */
const getHeadingStyle = (size: number): object => {
  return themedProperty(headings, String(size))
}

/**
 * Text styles for single line text.
 * This is used in the Text component. The Text component is used by:
 * - Small
 * - Strong
 * - Code
 * - ListItem
 * - Label
 */
const getTextStyle = (size: number): object => {
  return themedProperty(text, String(size))
}

/**
 * Text styles for paragraphs (multi line text).
 * This is used in the Paragraph.
 */
const getParagraphStyle = (size: number): object => {
  return themedProperty(paragraph, String(size))
}

/**
 * Get the font family. This is used to override the font family.
 */
const getFontFamily = (fontFamily: string): string => {
  /**
   * Allow for passing in a custom fontFamily not in the theme.
   */
  return themedProperty(fontFamilies, fontFamily)
}

/**
 * Get the text color. This is used to override the color.
 */
const getTextColor = (color: string, theme: ThemeType) => {
  /**
   * Allow Color to be current theme color
   */
  if (color === 'theme') {
    return theme.palette[theme.themeColor].base
  }
  /**
   * Allow for passing in a custom text color not in the theme.
   */
  return themedProperty(colors.text, color)
}

export {
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
}
