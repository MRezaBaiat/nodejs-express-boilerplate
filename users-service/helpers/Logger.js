import chalk from 'chalk';

const logger = require('debug')('nodejs-express-boilerplate:server');

const log = (what) => {
  logger(what);
};

function error (err) {
  if (err.message) {
    console.log(chalk.red(err.message));
  }
  if (err.stack) {
    console.log(chalk.red(err.stack));
  }
}

export default {
  log,
  error
};
