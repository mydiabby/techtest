local defaultEnv = {
  WORKSPACE_ROOT: '{{ root }}',
  UID: '{{ shell "id -u" trim=true }}',
};

local modes = {
  'database': {
    file: 'docker-compose.database.yml'
  },
  'dev': {
    file: 'docker-compose.dev.yml',
    extraEnv: {
      API_CONFIG_PATH: '/home/dev/workspace/{{ workspace.projects.api.path }}/configurations/dev-docker.json',
      FRONTEND_LISTEN_ADDR: '0.0.0.0',
      FRONTEND_LISTEN_PORT: '80'
    },
  },
  'e2e': {
    file: 'docker-compose.e2e.yml',
    extraEnv: {
      API_CONFIG_PATH: '/home/dev/workspace/{{ workspace.projects.api.path }}/configurations/e2e-docker.json',
      FRONTEND_LISTEN_ADDR: '0.0.0.0',
      FRONTEND_LISTEN_PORT: '80',
      E2E_DB_HOST: 'database',
      E2E_DB_PORT: '5432',
      E2E_DB_USERNAME: 'postgres',
      E2E_DB_PASSWORD: 'postgres',
      E2E_DB_DATABASE: 'e2e',
      E2E_FRONTEND_ORIGIN: 'http://frontend'
    },
  }
};

local upTargets = {
  [name + '-up']: {
    executor: 'std:commands',
    options: {
      commands: [
        {
          program: 'docker',
          arguments: [
            'compose',
            '-f',
            modes[name].file,
            'up',
            '--remove-orphans',
            '--force-recreate',
            '--build',
          ],
          environment: defaultEnv + (if std.objectHas(modes[name], 'extraEnv') then modes[name].extraEnv else {}),
        },
      ],
    },
  } for name in std.objectFields(modes)
};

local downTargets = {
  [name + '-clean']: {
    executor: 'std:commands',
    options: {
      commands: [
        {
          program: 'docker',
          arguments: [
            'compose',
            '-f',
            modes[name].file,
            'down',
            '--volumes',
            '--remove-orphans'
          ],
          environment: defaultEnv + (if std.objectHas(modes[name], 'extraEnv') then modes[name].extraEnv else {}),
        },
      ],
    },
  } for name in std.objectFields(modes)
};

{
  targets: upTargets + downTargets + {
    clean: {
      dependencies: [name + '-clean' for name in std.objectFields(modes)]
    }
  },
}
