const yaml = require('js-yaml');
const fs   = require('fs');
const util = require('util');

exports.command = 'invoke';

exports.describe = 'invokes a remote method over nats';

exports.builder = {
  file: {
    alias: 'f',
    describe: 'The yaml file to load the payload of the invoke request from'
  },
  subject: {
    describe: 'the subject to invoke'
  },
  args: {
    describe: 'A space separated list of arguments',
    type: 'array'
  },
  metadata: {
    describe: 'A metadata object',
    type: 'object'
  }
};

exports.handler = function (argv) {

  // load request from file if provided
  const request = loadPayload(argv);

  // override subject and args if provided via command line
  request.subject = argv.subject || request.subject;
  request.args = argv.args || request.args;
  request.metadata = argv.metadata || request.metadata;

  // load paip and invoke the method
  const Paip = require('paip');
  const U = Paip.utils;

  const client = Paip({name:'paipctl', log:'off'});

  client.ready()
    .then(() => client.sendRequest(request))
    .then(U.getPayload)
    .then(payload => console.log(util.inspect(payload, { depth: null})))
    .catch(console.error)
    .then(U.shutdown(client));
};

const loadPayload = argv => {
  if (argv.file) {
    try {
      return yaml.safeLoad(fs.readFileSync(argv.file, 'utf8'));
    } catch (e) {
      console.error(`Unable to parse Yaml file: ${e.message}`);
      process.exit(1);
    }
  }
  else {
    return {}
  };
};
