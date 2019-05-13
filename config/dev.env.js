'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://192.168.11.85:20001"'
  // API_ROOT: '"http://193.1.1.227:20001"'
  API_ROOT: '"https://scteam-m.dmqwl.com"'
  // API_ROOT: '"https://glteam-api.dmqwl.com"'
})

