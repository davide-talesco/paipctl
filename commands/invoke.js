const yaml = require('js-yaml');
const fs   = require('fs');

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
  }
};

exports.handler = function (argv) {

  // load payload file if provided
  const payload = loadPayload(argv);

  // build subject and args parameters giving the command line options priority
  const subject = argv.subject || payload.subject;
  const args = argv.args || payload.args;

  // load paip and invoke the method
  const Paip = require('paip');

  const client = Paip({name:'paipctl', logLevel:'off'});

  client.invoke({subject, args})
    .then(console.log)
    .catch(console.error)
    .then(() => client.close());
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
