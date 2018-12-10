import { Intent } from '../../../../constants'
import themedProperty from '../utils/themedProperty'
import { colors, elevations, palette } from '../foundational-styles/'
import { fontFamilies, headings, paragraph, text } from '../typography/'

/**
 *
 * @param {string} color
 * @return {boolean} themeColor?
 */
const isThemeColor = color => {
  if (color in palette) {
    return true
  }
  return false
}

/**
 * @param {object} theme
 * @param {string} lightness
 * @return {string}
 */
function getThemeColor(theme, lightness) {
  console.log(this.theme)

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
 * @param {number} height
 * @return {number} border radius
 */
const getBorderRadiusForControlHeight = height => {
  if (height <= 40) return 5
  return 8
}

/**
 * Get the text size for a control with a certain height.
 * @param {number} height
 * @return {number} text size of the control height.
 */
const getTextSizeForControlHeight = height => {
  if (height <= 24) return 300
  if (height <= 28) return 300
  if (height <= 32) return 300
  if (height <= 36) return 400
  if (height <= 40) return 400
  if (height <= 48) return 500
  if (height <= 56) return 700
  return 800
}

/**
 * Get the text size for a block with a certain height. Used in larger UI Components like Banner and Pane
 * @param {number} height
 * @return {number} text size of the block height.
 */
const getTextSizeForBlockHeight = height => {
  if (height <= 24) return 300
  if (height <= 50) return 300
  if (height <= 60) return 400
  if (height <= 70) return 400
  if (height <= 80) return 500
  if (height <= 90) return 600
  if (height <= 100) return 700
  return 800
}

/**
 * Get the size for a icon in a Button with a certain height.
 * @param {number} height
 * @return {number} icon size
 */
const getIconSizeForButton = height => {
  if (height <= 28) return 12
  if (height <= 32) return 12
  if (height <= 40) return 16
  if (height <= 48) return 18
  return 20
}

// Use the same for input components.
const getIconSizeForInput = getIconSizeForButton
const getIconSizeForSelect = getIconSizeForButton

/**
 * Get the size for a icon in a IconButton with a certain height.
 * @param {number} height
 * @return {number} icon size
 */
const getIconSizeForIconButton = height => {
  if (height <= 28) return 12
  if (height <= 32) return 14 // Slightly bigger than getIconSizeForButton
  if (height <= 40) return 16
  if (height <= 48) return 18
  return 20
}

/**
 * Get background property.
 * @param {string} background
 * @return {string} background property.
 */
const getBackground = background => {
  /**
   * Return one of theme presets or the original value.
   */
  return themedProperty(colors.background, background)
}

/**
 * Get box-shadow (elevation).
 * @param {string} level — level of elevation.
 * @param {string} color - color of elevation.
 * @return {string} elevation box-shadow.
 */
const getElevation = (level, color = 'neutral') => {
  /**
   * There is no fallback, undefined will be returned.
   */
  return color in elevations
    ? elevations[color][level]
    : elevations.neutral[level]
}

/**
 * Get the color for an icon.
 * @param {string} color
 * @return {string} color of the icon
 */
const getIconColor = color => {
  /**
   * Check if there is a preset in the theme for the icon color.
   */
  return themedProperty(colors.icon, color)
}

/**
 * Get the properties for an icon based on the intent.
 * @param {Intent} intent
 * @return {Object} properties
 */
const getIconForIntent = (intent, defaultColor) => {
  switch (intent) {
    case Intent.SUCCESS:
      return { icon: 'tick-circle', color: 'success' }
    case Intent.DANGER:
      return { icon: 'error', color: 'danger' }
    case Intent.WARNING:
      return { icon: 'warning-sign', color: 'warning' }
    case Intent.NONE:
    default:
      return {
        icon: 'info-sign',
        color: (palette[defaultColor] && palette[defaultColor].base) || 'info'
      }
  }
}

/**
 * Heading styles.
 * @param {number} size - 100–900. 500 is default.
 * @return {Object} heading style.
 */
const getHeadingStyle = size => {
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
 * @param {number} size - 300–500. 400 is default.
 * @return {Object} text style.
 */
const getTextStyle = size => {
  return themedProperty(text, String(size))
}

/**
 * Text styles for paragraphs (multi line text).
 * This is used in the Paragraph.
 * @param {number} size - 300–500. 400 is default.
 * @return {Object} text style.
 */
const getParagraphStyle = size => {
  return themedProperty(paragraph, String(size))
}

/**
 * Get the font family. This is used to override the font family.
 * @param {string} fontFamily
 * @return {string} font family
 */
const getFontFamily = fontFamily => {
  /**
   * Allow for passing in a custom fontFamily not in the theme.
   */
  return themedProperty(fontFamilies, fontFamily)
}

/**
 * Get the text color. This is used to override the color.
 * @param {string} fontFamily
 * @return {string} font family
 */
const getTextColor = (color, theme) => {
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
