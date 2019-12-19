jest.setTimeout(20000);
global.initializer = require('../users-service/bin/initializer');

(async function () {
  await global.initializer.initialize();
})();
