import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@parishconnect/box'
import * as icons from '../src/icons'
import { Heading, Paragraph, Link, Text } from '../src/typography'

storiesOf('icons', module).add('icons', () => (
  <div>
    <Box paddingLeft={40}>
      <Heading size={800}>icons</Heading>
      <Paragraph marginTop="default">
        Aluminum now uses the amazing{' '}
        <Link href="https://feathericons.com/">Feather Icons</Link> package for
        all of its icons.
      </Paragraph>
    </Box>

    {Object.entries(icons).map(([name, Icon]) => (
      <Box
        key={name}
        float="left"
        width={160}
        height={80}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <Icon color="default" />
        <Text is="p" size={300}>
          {name}
        </Text>
      </Box>
    ))}
  </div>
))
