'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://192.168.11.85:20001"'
  // API_ROOT: '"http://193.1.1.227:20004"'
  API_ROOT: '"http://nat.dmqwl.com:23004/"'
  // API_ROOT: '"https://glteam-api.dmqwl.com"'
  // API_ROOT:'"http://192.168.11.85:20004"'
  // API_ROOT: '"http://193.1.0.135:20004"'
  // API_ROOT: '"http://193.1.1.227:20002"'
  // API_ROOT: '"https://glteam-api.dmqwl.com"'
})
