/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react'
import TopBar from '../../components/TopBar'
import GetStartedSidebar from '../../components/GetStartedSidebar'
import SyntaxHighlighter from '../../components/SyntaxHighlighter'
import Layout from '../../components/Layout'

const NativeLink = ({ ...props }) => {
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export default () => {
  return (
    <Layout>
      <div className="MainLayout">
        <TopBar />
        <main className="MainLayout-main">
          <div className="MainLayout-content">
            <section className="Container">
              <div className="Content">
                <h1>Introduction</h1>
                <p>
                  Aluminum is a pragmatic UI kit for building evolving products
                  on the web.<br /> It is build and maintained open-source by{' '}
                  <NativeLink href="https://hennessyevan.com/">
                    Evan Hennessy
                  </NativeLink>.
                </p>
                <h2>Core beliefs of Aluminum</h2>
                <p>
                  <strong>
                    Aluminum is built on the belief that you can never predict
                    all future requirements, only prepare for it.
                  </strong>
                  {` `}
                  Instead of creating fixed configurations that work today,
                  Aluminum promotes building systems that anticipate new and
                  changing design requirements.
                </p>
                <p>
                  <strong>
                    Aluminum is built on the belief that things should work out
                    of the box with smart defaults and offer full control when
                    needed.
                  </strong>
                  {` `}
                  For example, Aluminum implements most components on top of a{' '}
                  <NativeLink href="https://github.com/segmentio/@hennessyevan/aluminum-box">
                    Box primitive
                  </NativeLink>{' '}
                  which allows for a lot of customization.
                </p>
                <p>
                  <strong>
                    Aluminum is built on the belief that using Aluminum and
                    contributing to Aluminum should be a pleasant experience.
                  </strong>{' '}
                  We prioritize documentation and all the tools for a solid
                  developer experience. We advocate respect and inclusivity in
                  our writings and interactions.
                </p>
                <h2>Install and use components</h2>
                <p>
                  Aluminum is made up of multiple components and tools which you
                  can import one by one. All you need to do is install the{' '}
                  <code>Aluminum-ui</code> package:
                </p>

                <pre>
                  <code>
                    {`
$ yarn add aluminum-ui
# or
$ npm install --save aluminum-ui
                `.trim()}
                  </code>
                </pre>

                <p>
                  A working version, assuming you are using something like{' '}
                  <NativeLink href="https://github.com/facebookincubator/create-react-app">
                    Create React App
                  </NativeLink>, might look like this:
                </p>

                <SyntaxHighlighter>
                  {`
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'aluminum-ui'

ReactDOM.render(
  <Button>I am using 〽️ Aluminum!</Button>,
  document.getElementById('root')
)
                `.trim()}
                </SyntaxHighlighter>
              </div>
            </section>
          </div>
          <GetStartedSidebar />
        </main>
      </div>
    </Layout>
  )
}
