module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-syntax-bigint',

    // ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // ["@babel/plugin-proposal-class-properties", { "loose" : true }],
  ],
}
