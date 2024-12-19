import pkg from 'serverless-webpack'; // default import
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const { lib } = pkg;

// To simulate __dirname in ES Modules:
const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  entry: lib.entries,
  target: 'node',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: join(__dirname, '.webpack'),
    filename: '[name].js',
  },
};

// Export the config using default export:
export default config;
