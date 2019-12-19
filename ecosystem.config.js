// https://pm2.keymetrics.io/docs/usage/cluster-mode/
// https://github.com/keymetrics/doc-pm2/blob/master/en/runtime/guide/load-balancing.md
// https://getstream.io/blog/running-pm2-node-js-in-production-environments/
module.exports = {

  apps: [{
    name: 'users-service',
    script: './users-service/bin/run.js',
    watch: true,
    instances: 3,
    exec_mode: 'cluster',
    env: {
      TOKEN_ISSUER: 'some issuer',
      AUTH_SECRET: '1234',
      NODE_ENV: 'development',
      MYSQL_USER: 'root',
      MYSQL_PASS: 'root',
      MYSQL_HOST: '192.168.99.100',
      MYSQL_PORT: '6605',
      MYSQL_DB: 'service_db',
      MONGO_HOST: '192.168.99.100',
      MONGO_PORT: '27018',
      MONGO_DB: 'users',
      PORT: 6050,
      REDIS_HOST: '192.168.99.100',
      REDIS_PORT: '6380',
      REDIS_PASSWORD: '',
      GOOGLE_CLIENT_ID: '420212493108-bkfkg3a0kl7ksi1nudiehms0su6e0i34.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: 'AnDIiGt_vXrAmpcuF8XSyGqB',
      SECURE_KEY: 'my secure key'// for @authentication/cookie-session
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]

};
