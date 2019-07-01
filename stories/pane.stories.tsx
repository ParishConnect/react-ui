import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Pane, Card } from '../src/layers'
import { defaultTheme as theme } from '../src/theme'
import { BackgroundColor } from '../src/constants'

const cardStyle = {
  float: 'left' as any,
  margin: 32,
  width: [160, 140, 104],
  height: 104,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

storiesOf('layers', module)
  .add('Responsive', () => (
    <Pane
      {...cardStyle}
      background={['tint1', 'tint2', 'blue', 'purple']}
      borderRadius={[0, 0, 10, 100]}
      transition="225ms"
    />
  ))
  .add('Pane', () => (
    <div>
      <Pane overflow="auto">
        {theme.elevations.neutral.map((style, index) => (
          <Pane key={style} {...cardStyle} elevation={index}>
            Elevation {index}
          </Pane>
        ))}
        {Object.keys(theme.colors.background).map(background => (
          <Pane
            key={background}
            {...cardStyle}
            background={background as BackgroundColor}
          >
            Background: {background}
          </Pane>
        ))}
        {Object.keys(theme.colors.background).map(background => (
          <Pane key={background} {...cardStyle} identifier={background}>
            Identifier: {background}
          </Pane>
        ))}
      </Pane>
      <Pane overflow="auto">
        <Pane
          {...cardStyle}
          elevation={1}
          hoverElevation={3}
          activeElevation={2}
        >
          Interactive
        </Pane>
      </Pane>
      {Object.keys(theme.colors.border).map(borderColor => (
        <Pane key={borderColor} overflow="auto">
          <Pane {...cardStyle} borderTop={borderColor}>
            borderTop: {borderColor}
          </Pane>
          <Pane {...cardStyle} borderRight={borderColor}>
            borderRight: {borderColor}
          </Pane>
          <Pane {...cardStyle} borderBottom={borderColor}>
            borderBottom: {borderColor}
          </Pane>
          <Pane {...cardStyle} borderLeft={borderColor}>
            borderLeft: {borderColor}
          </Pane>
        </Pane>
      ))}
    </div>
  ))
  .add('Card', () => (
    <div>
      <Pane overflow="auto">
        {theme.elevations.neutral.map((style, index) => (
          <Card key={style} {...cardStyle} elevation={index}>
            Elevation {index}
          </Card>
        ))}

        {Object.keys(theme.colors.background).map(background => (
          <Card
            key={background}
            {...cardStyle}
            background={background as BackgroundColor}
          >
            Background: {background}
          </Card>
        ))}
        {Object.keys(theme.colors.background)
          .filter(background => !background.match(/Tint|tint|overlay/))
          .map(background => (
            <Card
              key={background}
              {...cardStyle}
              border="muted"
              identifier={background}
            >
              Identifier: {background}
            </Card>
          ))}
      </Pane>

      <Pane overflow="auto">
        <Card
          {...cardStyle}
          appearance="gradient"
          elevation={1}
          activeElevation={2}
          hoverElevation={3}
        >
          Interactive
        </Card>
      </Pane>
    </div>
  ))
