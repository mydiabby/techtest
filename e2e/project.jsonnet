local helpers = import 'helpers.libsonnet';
local getVar = helpers.getVar;

{
    targets: {
        install: {
            executor: 'std:commands',
            options: {
                commands: [
                    'npm install'
                ]
            },
            cache: {
                invalidateWhen: {
                    filesMissing: ['node_modules'],
                    inputChanges: ['package.json'],
                    outputChanges: ['package-lock.json']
                }
            }
        },
        run: {
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: './node_modules/.bin/playwright',
                        arguments: ['test'],
                        environment: {
                            DB_HOST: getVar({
                                env: 'E2E_DB_HOST',
                                var: 'e2e.database.host',
                                default: '127.0.0.1'
                            }),
                            DB_PORT: getVar({
                                env: 'E2E_DB_PORT',
                                var: 'e2e.database.port',
                                default: '4002'
                            }),
                            DB_USERNAME: getVar({
                                env: 'E2E_DB_USERNAME',
                                var: 'e2e.database.username',
                                default: 'postgres'
                            }),
                            DB_PASSWORD: getVar({
                                env: 'E2E_DB_PASSWORD',
                                var: 'e2e.database.password',
                                default: 'postgres'
                            }),
                            DB_DATABASE: getVar({
                                env: 'E2E_DB_DATABASE',
                                var: 'e2e.database.database',
                                default: 'e2e'
                            }),
                            FRONTEND_ORIGIN: getVar({
                                env: 'E2E_FRONTEND_ORIGIN',
                                var: 'e2e.frontend.origin',
                                default: 'http://127.0.0.1:4000'
                            })
                        }
                    }
                ]
            },
            dependencies: ['install']
        },
        clean: {
            executor: 'std:commands',
            options: {
                commands: ['rm -rf node_modules playwright-report test-results']
            }
        }
    }
}