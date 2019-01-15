import * as React from 'react'
import defaultTheme from './default-theme/'
import { ThemeType } from '../../constants'

/**
 * Use React 16.3+ createContext API.
 */
const ThemeContext = React.createContext<ThemeType | any>(defaultTheme)
const { Provider: ThemeProvider, Consumer: ThemeConsumer } = ThemeContext
export default ThemeContext
export { ThemeProvider, ThemeConsumer }
