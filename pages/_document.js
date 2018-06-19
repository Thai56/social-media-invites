import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
export default class CustomDocument extends Document {
  static async getInitialProps (ctx) {
    return await Document.getInitialProps(ctx)
  }

  render () {
    return (
      <html>
        <Head>
          <title>Site Title</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
      <link href="https://fonts.googleapis.com/css?family=Shrikhand" rel="stylesheet" />
      <link rel='stylesheet' href='/_next/static/style.css' />
      </Head>
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript" src="node_modules/auth0-js/build/auth0.js"></script>
      <script src="//cdn.auth0.com/js/lock-9.0.min.js"></script>
        </body>
      </html>
    )
  }
}
