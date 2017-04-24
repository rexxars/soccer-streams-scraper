'use strict'

const getIt = require('get-it')
const base = require('get-it/lib/middleware/base')
const promise = require('get-it/lib/middleware/promise')
const httpErrors = require('get-it/lib/middleware/httpErrors')

module.exports = getIt([
  base('https://soccerstreams.net'),
  promise(),
  httpErrors()
])
