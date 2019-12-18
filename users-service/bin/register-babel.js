require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-flow'],
  ignore: [__dirname + '/../../**/node_modules'],
  plugins: [
    ['@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ],
    '@babel/plugin-proposal-class-properties'
  ]
});

require('./www');
