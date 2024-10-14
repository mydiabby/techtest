local blaze = std.extVar('blaze');
local helpers = import 'helpers.libsonnet';
local getVar = helpers.getVar;

{
  targets: {
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
    serve: {
      executor: 'std:commands',
      options: {
        commands: [
          {
            program: 'npm',
            arguments: ['run', 'start:dev'],
            environment: {
              CONFIG_PATH: getVar({
                env: 'API_CONFIG_PATH',
                var: 'api.configPath',
                default: '{{ project.root }}/configurations/dev-local.json',
              }),
            },
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
    source: {
      cache: {
        invalidateWhen: {
          inputChanges: ['src/**', 'tsconfig*.json'],
        },
      },
    },
    build: {
      executor: 'std:commands',
      options: {
        commands: [
          'npm run build',
        ],
      },
      cache: {
        invalidateWhen: {
          outputChanges: ['dist/**'],
        },
      },
      dependencies: ['install', 'source'],
    },
    'generate-migration': {
      local migrationName = blaze.vars.migrations.name,
      executor: 'std:commands',
      options: {
        commands: [
          {
            program: './node_modules/.bin/ts-node',
            arguments: ['generate-migration.ts'],
            environment: if migrationName != null then {
              MIGRATION_NAME: migrationName,
            } else {},
          },
        ],
      },
      dependencies: ['install', 'source'],
    },
    clean: {
      executor: 'std:commands',
      options: {
        commands: [
          'rm -rf node_modules dist',
        ],
      },
    },
  },
}
