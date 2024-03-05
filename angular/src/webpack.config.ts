import { EnvironmentPlugin } from 'webpack';
import * as path from 'path';

const dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new dotenv({
      path: `${path.join(__dirname, '..', '..', '.env')}`,
    }),
  ],
};
