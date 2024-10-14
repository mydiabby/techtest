local helpers = import 'helpers.libsonnet';
local getVar = helpers.getVar;
local blaze = std.extVar('blaze');

{
  targets: {
    serve: {

      executor: 'std:commands',
      options: {
        commands: [
          {
            program: './node_modules/.bin/ng',
            arguments: [
              'serve',
              '--port',
              getVar({
                var: 'frontend.listen.port',
                env: 'FRONTEND_LISTEN_PORT',
                default: '4000',
              }),
              '--host',
              getVar({
                var: 'frontend.listen.addr',
                env: 'FRONTEND_LISTEN_ADDR',
                default: '127.0.0.1',
              }),
            ],
          },
        ],
      },
      dependencies: ['install', 'source'],
    },
    lint: {
      executor: 'std:commands',
      options: {
        commands: [
          {
            program: './node_modules/.bin/eslint',
            arguments: (if blaze.vars.lint.fix then ['--fix'] else [])
                       + [blaze.project.root],
          },
        ],
      },
      dependencies: [
        'source',
      ],
    },
    install: {
      executor: 'std:commands',
      options: {
        commands: [
          'npm install',
        ],
      },
      cache: {
        invalidateWhen: {
          filesMissing: ['node_modules'],
          inputChanges: ['package.json'],
          outputChanges: ['package-lock.json'],
        },
      },
    },
    source: {
      cache: {
        invalidateWhen: {
          inputChanges: [
            'src/**',
            'angular.json',
            'tsconfig*.json',
          ],
        },
      },
    },
    clean: {
      executor: 'std:commands',
      options: {
        commands: [
          'rm -rf node_modules .angular dist',
        ],
      },
    },
  },
}
