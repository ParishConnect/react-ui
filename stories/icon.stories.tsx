import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import { Icon, IconNames, Heading, Paragraph, Text, Link } from '../src'

storiesOf('icon', module).add('Icon', () => (
  <div>
    <Box paddingLeft={40}>
      <Heading size={800}>Icons</Heading>
      <Paragraph marginTop="default">
        Aluminum uses the amazing
        <Link href="https://blueprintjs.com/docs/v2/#icons">
          @blueprintjs/icons
        </Link>{' '}
        package for all of its icons.
      </Paragraph>
    </Box>
    {Object.keys(IconNames).map(iconKey => {
      return (
        <Box
          key={iconKey}
          float="left"
          width={140}
          height={140}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
        >
          <Icon icon={IconNames[iconKey]} color="default" />
          <Text is="p" size={300}>
            {IconNames[iconKey]}
          </Text>
        </Box>
      )
    })}
  </div>
))
