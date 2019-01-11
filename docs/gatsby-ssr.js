/* eslint-disable react/no-danger */
const React = require('react')
const { extractStyles } = require('../lib')

exports.onRenderBody = ({ setHeadComponents }) => {
  // Get the css and hydration script from ParishKit.
  const { css, hydrationScript } = extractStyles()

  // Takes an array of components as its first argument which are added to
  // the headComponents array which is passed to the html.js component.
  setHeadComponents([
    // We need a key here for Gatsby to stop complaining.
    <React.Fragment key="parishkit-ssr">
      <style id="parishkit-css" dangerouslySetInnerHTML={{ __html: css }} />
      {hydrationScript}
    </React.Fragment>
  ])
}
