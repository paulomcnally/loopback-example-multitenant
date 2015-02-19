var tenant = require('../../tenant');
module.exports = function mountRestApi(server) {
  var restApiRoot = server.get('restApiRoot');
  tenant(server);
  server.use('/:tenant/', server.loopback.rest());
};
