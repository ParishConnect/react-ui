import * as React from 'react'
import { Pane, Heading, ThemeConsumer } from '../src'
import ColorGroup from './ColorGroup'

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default class ColorExamples extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {theme => (
          <Pane {...this.props as any}>
            <Pane clearfix>
              <Heading size={800}>Palette</Heading>
              {Object.keys(theme.palette).map(key => {
                return (
                  <ColorGroup
                    key={key}
                    title={capitalize(key)}
                    colorGroup={theme.palette[key]}
                    name={childKey => `theme.palette.${key}.${childKey}`}
                  />
                )
              })}
            </Pane>
            <Pane clearfix>
              <Heading size={800} marginTop="default">
                Functional Colors
              </Heading>
              {Object.keys(theme.colors).map(key => {
                return (
                  <ColorGroup
                    key={key}
                    title={capitalize(key)}
                    colorGroup={theme.colors[key]}
                    name={childKey => `theme.colors.${key}.${childKey}`}
                  />
                )
              })}
            </Pane>
            <Pane clearfix>
              <Heading size={800} marginTop="default">
                Scales
              </Heading>
              {Object.keys(theme.scales).map(key => {
                return (
                  <ColorGroup
                    key={key}
                    title={capitalize(key)}
                    colorGroup={theme.scales[key]}
                    name={childKey => `theme.scales.${key}.${childKey}`}
                  />
                )
              })}
            </Pane>
          </Pane>
        )}
      </ThemeConsumer>
    )
  }
}
