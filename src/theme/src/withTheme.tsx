//tslint:disable
import * as React from 'react'
import ThemeContext from './ThemeContext'

export interface WithThemeProps {
  [prop: string]: any
}

// export default function withTheme<P>(
//   Component: React.ComponentClass<P> | React.SFC<P>
// ) {
//   // tslint:disable-next-line:no-unused
//   return function ThemedComponent(props: P) {
//     return (
//       <ThemeConsumer>
//         {theme => <Component {...props as any} theme={theme} />}
//       </ThemeConsumer>
//     )
//   }
// }

/**
 * Generic type utility to subtract keys from one interface from the other.
 *
 * @example
 * interface One { one: string }
 * interface Three { one: string, two: string }
 *
 * type Two = Omit<Three, keyof One>;
 *
 * // The type of Two will be
 * interface Two { two: string }
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Mark mark all the properies from K in T as optional.
 */
type Optionalize<T extends K, K> = Omit<T, keyof K>

export default function withTheme<T extends WithThemeProps = WithThemeProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  return class ComponentWithTheme extends React.Component<
    Optionalize<T, WithThemeProps>
  > {
    public static displayName = `withPages(${displayName})`
    public static contextType = ThemeContext

    public render() {
      // Fetch the props you want inject. This could be done with context instead.
      const themeProps = this.context

      // this.props comes afterwards so the can override the default ones.
      return <WrappedComponent {...themeProps} {...(this.props as any)} />
    }
  }
}
