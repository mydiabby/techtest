module.exports = {
  default: [
    'test/e2e/features/**/*.feature',
    '--require-module ts-node/register',
    '--require-module module-alias/register',
    '--require test/e2e/steps-definitions/**/*.ts',
    '--format progress-bar',
  ].join(' '),
};
