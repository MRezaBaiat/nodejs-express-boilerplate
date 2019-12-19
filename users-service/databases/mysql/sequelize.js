import Sequelize from 'sequelize';
const config = require('./config').default[process.env.NODE_ENV];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export const initialize = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

export const shutdown = () => {
  return sequelize.close();
};

export default sequelize;
