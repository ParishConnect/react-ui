import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Banner, toaster } from '../src'

const bannerStyle = {
  margin: 32,
  width: 325,
  height: 75
}

storiesOf('banner', module).add('Banner', () => (
  <div>
    <Banner
      subtitle="subtitle"
      action={{
        title: 'Action',
        icon: 'document-share',
        onClick: () => toaster.notify('message')
      }}
      {...bannerStyle}
    >
      Banner Title
    </Banner>
  </div>
))
