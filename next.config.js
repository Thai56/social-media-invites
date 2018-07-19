const withTypescript = require("@zeit/next-typescript")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withESLint = require('next-eslint')

module.exports = withESLint(
  withCSS(
    withTypescript(
      withImages({
        inlineImageLimit: 16384,
        webpack(config, options) {
          // Do not run type checking twice:
          if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
          if (options.dev) {
            config.module.rules.push({
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'eslint-loader',
              options: {
                emitError: true,
              }
            })

            return config
          }
        }
      })
    )
  )
)
