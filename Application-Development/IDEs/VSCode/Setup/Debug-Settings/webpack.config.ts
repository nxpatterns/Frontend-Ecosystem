import { composePlugins, withNx } from '@nx/webpack';

module.exports = composePlugins(withNx(), (config) => {
  config.module = {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: require.resolve('ts-loader') }],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: require.resolve('html-loader'),
            options: { minimize: true, esModule: true },
          },
        ],
      },
    ],
  };
  config.resolve = {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.html'],
  };
  // console.log(config);
  return config;
});
