const path = require('path')

const DOTENV        = require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
const DOTENV_EXPAND = require('dotenv-expand')
DOTENV_EXPAND(DOTENV)

module.exports = {
  test: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds")
    }
  },

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds")
    }
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds")
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds")
    }
  }
}
