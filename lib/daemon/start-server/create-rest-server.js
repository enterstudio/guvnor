'use strict'

const Hapi = require('hapi')
const config = require('../config')
const routes = require('../routes')
const authenticate = require('./authenticate')
const operations = require('../../operations')
const Good = require('good')
const GoodEnough = require('good-enough')

module.exports = function createServer (tls, callback) {
  const server = new Hapi.Server()
  server.connection({
    port: config.HTTPS_PORT,
    tls: {
      key: tls.clientKey,
      cert: tls.certificate,
      ca: tls.serviceCertificate,
      requestCert: true,
      rejectUnauthorized: false
    },
    routes: {
      cors: true
    }
  })

  server.auth.scheme('certificate', (server, options) => {
    return {
      authenticate: authenticate.bind(null, tls)
    }
  })
  server.auth.strategy('certificate', 'certificate')
  server.auth.default('certificate')

  routes(server, (error) => {
    if (error) {
      return callback(error, server)
    }

    Object.keys(operations).forEach((key) => {
      server.method(key, operations[key])
    })

    server.register({
      register: Good,
      options: {
        reporters: {
          enough: [{
            module: 'good-enough',
            args: [{
              events: {
                error: '*',
                log: '*',
                request: '*',
                response: '*',
                wreck: '*',
                ops: '*'
              }
            }]
          }]
        }
      }
    }, (error) => {
      callback(error, server)
    })
  })
}