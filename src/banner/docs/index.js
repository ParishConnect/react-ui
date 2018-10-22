import React from 'react'
import { toaster } from '../../toaster'
import { Banner } from '../../banner'

/* eslint-disable import/no-unresolved, import/no-webpack-loader-syntax */
import sourceBanner from '!raw-loader!../src/Banner'
/* eslint-enable import/no-unresolved, import/no-webpack-loader-syntax */

/**
 * Code examples
 */
import bannerExample from './examples/Banner.example'

const title = 'Banner'
const subTitle = 'A banner used for taking action and delivering notifications.'

const designGuidelines = (
  <div>
    <p>
      By default banners have a height of <code>75px</code> and a width of
      <code>325px</code>. It is possible to change this to any height and the
      text style and spacing will adjust. You should refrain from having
      different size banners side by side.
    </p>
  </div>
)

const appearanceOptions = null

const components = [
  {
    name: 'Banner',
    source: sourceBanner,
    description: (
      <p>
        The base <code>Banner</code> follows the theme. Banners can also hold an
        action after the main content area. Avoid using an icon unless the
        intent is very clear.
      </p>
    ),
    examples: [
      {
        title: 'Banner',
        description: (
          <div>
            <p>
              Banners support an optional action icon. Always provide an action
              title as an alternate title.
            </p>
          </div>
        ),
        codeText: bannerExample,
        scope: { Banner, toaster }
      }
    ]
  }
]

export default {
  title,
  subTitle,
  designGuidelines,
  appearanceOptions,
  components
}
