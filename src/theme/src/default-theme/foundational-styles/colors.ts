import { linearGradient } from '../helpers'
import gradients from './gradients'
import palette from './palette'
import scales from './scales'

/**
 * This object are functional colors being used the default theme.
 * A required property is required by the default theme NOT by Evergreen itself.
 */

export default {
  /**
   * Available on Pane as `<Pane background="tint1" />`
   */
  background: {
    tint1: scales.neutral.N1,
    tint2: scales.neutral.N2,
    overlay: scales.neutral.N7A,

    // Non required.
    yellowTint: palette.yellow.lightest,
    greenTint: palette.green.lightest,
    orangeTint: palette.orange.lightest,
    redTint: palette.red.lightest,
    blueTint: palette.blue.lightest,
    purpleTint: palette.purple.lightest,
    tealTint: palette.teal.lightest,

    // Gradients
    neutral: linearGradient(gradients.neutral.start, gradients.neutral.end),
    green: linearGradient(gradients.green.start, String(gradients.green.end)),
    orange: linearGradient(gradients.orange.start, gradients.orange.end),
    red: linearGradient(gradients.red.start, gradients.red.end),
    blue: linearGradient(gradients.blue.start, gradients.blue.end),
    purple: linearGradient(
      gradients.purple.start,
      String(gradients.purple.end)
    ),
    teal: linearGradient(gradients.teal.start, gradients.teal.end)
  },

  /**
   * Available on Pane as `<Pane borderBottom borderRight="muted" />`
   */
  border: {
    default: scales.neutral.N4, // Was BorderColors.muted in v3 and under.
    muted: scales.neutral.N3 // Was BorderColors.extraMuted in v3 and under
  },

  /**
   * Text colors available on Text as `<Text color="muted" />`.
   */
  text: {
    muted: scales.neutral.N8,
    default: scales.neutral.N9,
    dark: scales.neutral.N10,
    selected: palette.blue.base,

    // Theme
    green: palette.green.base,
    orange: palette.orange.base,
    red: palette.red.base,
    blue: palette.blue.base,
    purple: palette.purple.base,
    teal: palette.teal.base,

    // Intent.
    success: palette.green.dark,
    info: palette.blue.dark,
    danger: palette.red.dark,
    warning: palette.orange.dark
  },

  /**
   * Icon colors available on Icon.
   */
  icon: {
    default: scales.neutral.N8,
    muted: scales.neutral.N7,
    disabled: scales.neutral.N5A,
    selected: palette.blue.base,

    // Intent.
    success: palette.green.base,
    info: palette.blue.base,
    danger: palette.red.base,
    warning: palette.orange.base,

    // White.
    white: 'white'
  },

  /**
   * Used for Alerts and other components that express intent.
   */
  intent: {
    none: palette.blue.base,
    success: palette.green.base,
    danger: palette.red.base,
    warning: palette.orange.base
  }
}
