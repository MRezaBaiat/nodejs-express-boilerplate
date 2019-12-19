import chalk from 'chalk';

const logger = require('debug')('nodejs-express-boilerplate:server');

const log = (what) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  logger(what);
};

function error (err) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
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
