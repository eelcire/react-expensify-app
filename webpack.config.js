// entry --> output
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').congif({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').congif({ path: '.env.development' })
}

// process.env.NODE_ENV

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css'})

  return {
    // Customize start file and output file
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    // Customize webpack behavior on loading a specific file
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
        // use: [
        //   {
        //     loader: MiniCssExtractPlugin.loader
        //   },
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       sourceMap: true
        //     }
        //   },
        //   {
        //     loader: 'sass-loader',
        //     options: {
        //       sourceMap: true
        //     }
        //   }
        // ]
			}]
		},
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
      })
    ],
    // debugger tool that shows original source code outside of the bundle
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      // serves up bundle from memory
      // similiar to live-server, but with webpack specific config options
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  
  // babel vs webpack is different
  // loader (transforms a file before webpack uses it)
  
      // "babel-cli": "^6.24.1",
      // "babel-core": "^6.25.0",
  
  }
}
