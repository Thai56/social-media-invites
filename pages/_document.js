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
          <link href="/static/stylesheets/styles.css" rel="stylesheet" />
          <link href="/static/stylesheets/prism.css" rel="stylesheet" />
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
