import React from 'react'

export default class PageFooter extends React.PureComponent {
  render() {
    return (
      <footer className="PageFooter bg-dark clearfix">
        <div className="Container PageFooter-inner">
          <div className="PageFooter-right">
            <p>© {new Date().getFullYear()}, ParishConnect Inc.</p>
          </div>
        </div>
      </footer>
    )
  }
}
