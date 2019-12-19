const ecosystem = require('../ecosystem.config').apps[0].env;

module.exports = async () => {
  Object.keys(ecosystem).forEach((key) => {
    if (key !== 'NODE_ENV') {
      process.env[key] = ecosystem[key];
    }
  });
};
