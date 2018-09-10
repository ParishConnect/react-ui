import scales from './scales'
import palette from './palette'

const neutralBorderShadow = scales.neutral.N5A // Used to be colors.neutral['80A'] in v3 and down.
const neutralBlurryShadow = scales.neutral.N6A // Used to be colors.neutral['50A'] in v3 and down.
const yellowBorderShadow = palette.yellow.base
const yellowBlurryShadow = palette.yellow.dark
const greenBorderShadow = palette.green.base
const greenBlurryShadow = palette.green.base
const orangeBorderShadow = palette.orange.base
const orangeBlurryShadow = palette.orange.base
const redBorderShadow = palette.red.base
const redBlurryShadow = palette.red.base
const blueBorderShadow = scales.blue.B5A
const blueBlurryShadow = scales.blue.B6A
const purpleBorderShadow = palette.purple.base
const purpleBlurryShadow = palette.purple.base
const tealBorderShadow = palette.teal.base
const tealBlurryShadow = palette.teal.base

/**
 * Elevation styles are applied as box shadows.
 * Available levels: 0, 1, 2, 3, 4.
 */
export default {
  neutral: [
    `0 0 1px ${neutralBorderShadow}`,
    `0 0 1px ${neutralBorderShadow}, 0 2px 4px -2px ${neutralBlurryShadow}`,
    `0 0 1px ${neutralBorderShadow}, 0 5px 8px -4px ${neutralBlurryShadow}`,
    `0 0 1px ${neutralBorderShadow}, 0 8px 10px -4px ${neutralBlurryShadow}`,
    `0 0 1px ${neutralBorderShadow}, 0 16px 24px -8px ${neutralBlurryShadow}`
  ],
  yellow: [
    `0 0 1px ${yellowBorderShadow}`,
    `0 0 1px ${yellowBorderShadow}, 0 2px 4px -2px ${yellowBlurryShadow}`,
    `0 0 1px ${yellowBorderShadow}, 0 5px 8px -4px ${yellowBlurryShadow}`,
    `0 0 1px ${yellowBorderShadow}, 0 8px 10px -4px ${yellowBlurryShadow}`,
    `0 0 1px ${yellowBorderShadow}, 0 16px 24px -8px ${yellowBlurryShadow}`
  ],
  green: [
    `0 0 1px ${greenBorderShadow}`,
    `0 0 1px ${greenBorderShadow}, 0 2px 4px -2px ${greenBlurryShadow}`,
    `0 0 1px ${greenBorderShadow}, 0 5px 8px -4px ${greenBlurryShadow}`,
    `0 0 1px ${greenBorderShadow}, 0 8px 10px -4px ${greenBlurryShadow}`,
    `0 0 1px ${greenBorderShadow}, 0 16px 24px -8px ${greenBlurryShadow}`
  ],
  orange: [
    `0 0 1px ${orangeBorderShadow}`,
    `0 0 1px ${orangeBorderShadow}, 0 2px 4px -2px ${orangeBlurryShadow}`,
    `0 0 1px ${orangeBorderShadow}, 0 5px 8px -4px ${orangeBlurryShadow}`,
    `0 0 1px ${orangeBorderShadow}, 0 8px 10px -4px ${orangeBlurryShadow}`,
    `0 0 1px ${orangeBorderShadow}, 0 16px 24px -8px ${orangeBlurryShadow}`
  ],
  red: [
    `0 0 1px ${redBorderShadow}`,
    `0 0 1px ${redBorderShadow}, 0 2px 4px -2px ${redBlurryShadow}`,
    `0 0 1px ${redBorderShadow}, 0 5px 8px -4px ${redBlurryShadow}`,
    `0 0 1px ${redBorderShadow}, 0 8px 10px -4px ${redBlurryShadow}`,
    `0 0 1px ${redBorderShadow}, 0 16px 24px -8px ${redBlurryShadow}`
  ],
  blue: [
    `0 0 1px ${blueBorderShadow}`,
    `0 0 1px ${blueBorderShadow}, 0 2px 4px -2px ${blueBlurryShadow}`,
    `0 0 1px ${blueBorderShadow}, 0 5px 8px -4px ${blueBlurryShadow}`,
    `0 0 1px ${blueBorderShadow}, 0 8px 10px -4px ${blueBlurryShadow}`,
    `0 0 1px ${blueBorderShadow}, 0 16px 24px -8px ${blueBlurryShadow}`
  ],
  purple: [
    `0 0 1px ${purpleBorderShadow}`,
    `0 0 1px ${purpleBorderShadow}, 0 2px 4px -2px ${purpleBlurryShadow}`,
    `0 0 1px ${purpleBorderShadow}, 0 5px 8px -4px ${purpleBlurryShadow}`,
    `0 0 1px ${purpleBorderShadow}, 0 8px 10px -4px ${purpleBlurryShadow}`,
    `0 0 1px ${purpleBorderShadow}, 0 16px 24px -8px ${purpleBlurryShadow}`
  ],
  teal: [
    `0 0 1px ${tealBorderShadow}`,
    `0 0 1px ${tealBorderShadow}, 0 2px 4px -2px ${tealBlurryShadow}`,
    `0 0 1px ${tealBorderShadow}, 0 5px 8px -4px ${tealBlurryShadow}`,
    `0 0 1px ${tealBorderShadow}, 0 8px 10px -4px ${tealBlurryShadow}`,
    `0 0 1px ${tealBorderShadow}, 0 16px 24px -8px ${tealBlurryShadow}`
  ]
}
