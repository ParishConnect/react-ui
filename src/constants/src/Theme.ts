export type ThemeColor =
  | 'blue'
  | 'red'
  | 'purple'
  | 'neutral'
  | 'orange'
  | 'green'
  | 'teal'

export interface ThemeType {
  themeColor: string
  palette: object
}
