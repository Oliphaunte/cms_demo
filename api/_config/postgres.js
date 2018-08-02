const pgtools = require('pgtools')
const path = require('path')

const DOTENV        = require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
const DOTENV_EXPAND = require('dotenv-expand')
DOTENV_EXPAND(DOTENV)

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
}

pgtools.createdb(config, process.env.DB_DATABASE)
  .then(res => console.log(res))
  .catch(err => console.error(err));