import colors from '../foundational-styles/colors'
import fontFamilies from './fontFamilies'

export default {
  '900': {
    fontSize: '40px',
    fontWeight: 600,
    lineHeight: '40px',
    letterSpacing: '-0.2px',
    marginTop: 52,
    fontFamily: fontFamilies.display,
    color: colors.text.dark
  },
  '800': {
    fontSize: '29px',
    fontWeight: 600,
    lineHeight: '32px',
    letterSpacing: '-0.2px',
    marginTop: 40,
    fontFamily: fontFamilies.display,
    color: colors.text.dark
  },
  '700': {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '28px',
    letterSpacing: '-0.07px',
    marginTop: 40,
    fontFamily: fontFamilies.display,
    color: colors.text.dark
  },
  '600': {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-0.07px',
    marginTop: 28,
    fontFamily: fontFamilies.display,
    color: colors.text.dark
  },
  '500': {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '-0.05px',
    marginTop: 24,
    fontFamily: fontFamilies.ui,
    color: colors.text.dark
  },
  '400': {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: '-0.05px',
    marginTop: 16,
    fontFamily: fontFamilies.ui,
    color: colors.text.dark
  },
  '300': {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '0',
    marginTop: 16,
    fontFamily: fontFamilies.ui,
    color: colors.text.dark
  },
  '200': {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '16px',
    marginTop: 16,
    fontFamily: fontFamilies.ui,
    color: colors.text.muted
  },
  '100': {
    fontSize: '11px',
    fontWeight: 400,
    textTransform: 'uppercase',
    lineHeight: '16px',
    letterSpacing: '0.6px',
    marginTop: 16,
    fontFamily: fontFamilies.ui,
    color: colors.text.muted
  }
}
