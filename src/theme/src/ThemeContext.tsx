import * as React from 'react'
import defaultTheme from './default-theme/'
import { ThemeType } from '../../constants'

/**
 * Use React 16.3+ createContext API.
 */
const {
  Provider: ThemeProvider,
  Consumer: ThemeConsumer
} = React.createContext<ThemeType | any>(defaultTheme)

export { ThemeProvider, ThemeConsumer }
