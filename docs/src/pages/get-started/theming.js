import React from 'react'
import TopBar from '../../components/TopBar'
import GetStartedSidebar from '../../components/GetStartedSidebar'
import Layout from '../../components/Layout'

export default () => {
  return (
    <Layout>
      <div className="MainLayout">
        <TopBar />
        <main className="MainLayout-main">
          <div className="MainLayout-content">
            <section className="Container">
              <div className="Content">
                <h1>Theming</h1>
                <p>Aluminum currently does support theming.</p>
              </div>
            </section>
          </div>
          <GetStartedSidebar />
        </main>
      </div>
    </Layout>
  )
}
