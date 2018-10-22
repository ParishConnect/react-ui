import { storiesOf } from '@storybook/react'
import React from 'react'
import { Banner } from '../../banner'
import toaster from '../../toaster/src'

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
