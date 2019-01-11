import React from 'react'
import Helmet from 'react-helmet'
import TopBar from '../components/TopBar'
import Layout from '../components/Layout'
import PageFooter from '../components/PageFooter'
import Features from '../components/Features'
import HomeHero from '../components/HomeHero'

export default class Root extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Parish Kit</title>
        </Helmet>
        <div>
          <TopBar />
          <main>
            <HomeHero />
            <Features />
          </main>
        </div>
        <PageFooter />
      </Layout>
    )
  }
}
