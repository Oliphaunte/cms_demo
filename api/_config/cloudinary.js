const path = require('path')

const DOTENV        = require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
const DOTENV_EXPAND = require('dotenv-expand')
DOTENV_EXPAND(DOTENV)

const cloudinary_config = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
}

export default cloudinary_config