#!/usr/bin/env node

require('yargs')
  .command(require('./commands/invoke'))
  .command(require('./commands/observe'))
  .help()
  .argv