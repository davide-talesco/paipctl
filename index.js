#!/usr/bin/env node

require('yargs')
  .command(require('./commands/invoke'))
  .help()
  .argv