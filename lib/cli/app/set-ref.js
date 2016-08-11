'use strict'

const config = require('../config')
const pkg = require('../../../package.json')

module.exports = (user, api, yargs) => {
  const argv = yargs
    .usage('Usage: $0 app set-ref [options] <app> <ref>')
    .demand(5, 'Please specify an app and a valid ref')
    .example('$0 app set-ref my-app master', 'Check out the master branch of my-app')
    .example('$0 app set-ref my-app new-feature', 'Check out the new-feature branch of my-app')

    .help('h')
    .alias('h', 'help')

    .describe('verbose', 'Prints detailed internal logging output')
    .alias('v', 'verbose')
    .boolean('v')

    .option('_', {
      type: 'string'
    })

    .epilog(`${config.DAEMON_NAME} v${pkg.version}`)
    .argv

  const name = argv._[3]
  const ref = argv._[4]

  api.app.setRef(name, ref, console.info, (error) => {
    if (error) {
      throw error
    }

    console.info(`Set ${name} ref to ${ref}`)

    api.disconnect()
  })
}