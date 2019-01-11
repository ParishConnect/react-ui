import React from 'react'
import Helmet from 'react-helmet'
import TopBar from '../components/TopBar'
import Layout from '../components/Layout'
import PageFooter from '../components/PageFooter'
import DesignersHero from '../components/DesignersHero'

export default class Root extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Designers &middot; ParishKit</title>
        </Helmet>
        <div>
          <TopBar/>
          <main>
            <DesignersHero/>
          </main>
        </div>
        <PageFooter/>
      </Layout>
    )
  }
}
