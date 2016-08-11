'use strict'

const config = require('../config')
const pkg = require('../../../package.json')

module.exports = function workers (user, api, yargs) {
  const argv = yargs
    .usage('Usage: $0 workers [options] <script> <number>')
    .demand(5, 'Please specify a script and a number of workers')
    .example('$0 workers hello.js 3', 'Make hello.js have three cluster workers')

    .help('h')
    .alias('h', 'help')

    .describe('verbose', 'Prints detailed internal logging output')
    .alias('v', 'verbose')
    .boolean('v')

    .epilog(`${config.DAEMON_NAME} v${pkg.version}`)
    .argv

  const proc = argv._[3]
  const workers = argv._[4]

  api.process.workers(proc, workers, function (error) {
    if (error) {
      throw error
    }

    console.info(`Set process ${proc} workers to ${workers}`)

    api.disconnect()
  })
}