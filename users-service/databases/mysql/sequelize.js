import Sequelize from 'sequelize';
const config = require('./config').default[process.env.NODE_ENV];

console.log(config);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
