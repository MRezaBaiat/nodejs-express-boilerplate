const server = require('../bin/www');
const gracefulShutdown = require('http-graceful-shutdown');

module.exports = {
  initialize: async () => {
    await require('../databases/mongo').initialize();
    await require('../databases/mysql/sequelize').initialize();
    await require('../databases/mysql/PostsDB').initialize();
    return server;
  },
  shutdown: async () => {
    await require('../databases/mongo').shutdown();
    await require('../databases/mysql/sequelize').shutdown();
    await gracefulShutdown(server);
  }
};
