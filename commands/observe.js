exports.command = 'observe';

exports.describe = 'observe paip notice messages';

exports.builder = {
  subject: {
    describe: 'the subject to invoke',
    required: true,
    alias: 's'
  }
};

exports.handler = function (argv) {

  const subject = argv.subject;

  // load paip and invoke the method
  const Paip = require('paip');

  const client = Paip({name:'paipctl', log:'off'});

  client.observe(subject, function(Notice){
    console.log(JSON.stringify(Notice.get()))
  });

  client.ready()
};
