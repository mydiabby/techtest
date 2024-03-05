export const environment = {
  production: false,
  API_HOST: process.env['API_HOST'] || 'http://localhost',
  API_PORT: process.env['NEST_PORT'] || '3000',
};
