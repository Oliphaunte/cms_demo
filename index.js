if (process.env.NODE_ENV !== 'production') {
  const DOTENV        = require('dotenv').config()
  const DOTENV_EXPAND = require('dotenv-expand')
  DOTENV_EXPAND(DOTENV)
}

require('babel-core/register')
require('babel-polyfill')
require('./api/')
require('./api/router')