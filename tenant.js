var fs = require('fs');
var path = require('path');
var util = require('util');
var DataSource = require('loopback-datasource-juggler').DataSource;

exports = module.exports = function tenant(app) {

  app.use('/:tenant/', function(req, res, next) {

    var tenant = req.params.tenant;
    var dataSourceFileName = util.format('datasources.%s.json', tenant);
    var dataSourcePath = path.resolve(__dirname, 'server/', dataSourceFileName);

    if (fs.existsSync(dataSourcePath)) {

      var dataSourceObj = JSON.parse(fs.readFileSync(dataSourcePath, 'utf8'));

      Object.keys(dataSourceObj).forEach(function(dataSource) {

        app.dataSources[dataSource].adapter.settings = dataSourceObj[dataSource];
        app.dataSources[dataSource].adapter.clientConfig = dataSourceObj[dataSource];
        app.dataSources[dataSource].settings = dataSourceObj[dataSource];
        app.dataSources[dataSource].connector.settings = dataSourceObj[dataSource];
        app.dataSources[dataSource].connector.clientConfig = dataSourceObj[dataSource];

      });

      next();
    }
    else {

      // Invalid tenant
      res.json({
        'error': {
          'name':'Error',
          'status':404,
          'message':'Invalid tenant',
          'statusCode':404,
          'stack':'https://www.npmjs.com/package/loopback-tenant'
        }
      });

    }

  });
};
