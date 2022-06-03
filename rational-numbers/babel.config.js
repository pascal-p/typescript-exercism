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
    [
      require('@babel/plugin-proposal-decorators').default,
      {
        legacy: true
      }
    ],
    [
      require("@babel/plugin-proposal-class-properties").default,
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-private-property-in-object",
      { "loose": true }
    ],
    // '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-syntax-bigint',
  ],
}
