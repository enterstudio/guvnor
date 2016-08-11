'use strict'

const dnode = require('boss-dnode')
const through2 = require('through2')
const config = require('../../config')

const timeout = process.env[`${config.DAEMON_ENV_NAME}_RPC_TIMEOUT`]

module.exports = function startDnodeServer (callback) {
  const stream = through2.obj(function (chunk, enc, next) {
    process.send({
      dnode: true,
      request: chunk
    })

    next()
  })

  const api = {
    forceGc: require('./force-gc'),
    reportStatus: require('./report-status'),
    send: require('./send'),
    takeHeapSnapshot: require('./take-heap-snapshot')
  }

  // publish RPC methods
  const d = dnode(api, {
    timeout: timeout
  })
  d.on('error', function (error) {
    console.error(error)
  })
  d.on('remote', function (master) {
    callback(null, master)
  })
  stream.pipe(d).pipe(stream)

  process.on('message', function (message) {
    if (!message.dnode) {
      return
    }

    d.write(message.request)
  })
}