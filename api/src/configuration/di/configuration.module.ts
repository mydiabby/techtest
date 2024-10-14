import { Module } from '@nestjs/common'
import { CONFIGURATION } from './configuration.tokens'
import { readFile } from 'fs/promises'
import { Configuration, configurationSchema } from '../configuration'

const configurationPathEnvVar = 'CONFIG_PATH'
const defaultConfigurationPath = 'configuration.json'

@Module({
    exports: [CONFIGURATION],
    providers: [
        {
            provide: CONFIGURATION,
            useFactory: async (): Promise<Configuration> => {
                const json = JSON.parse(await readFile(process.env[configurationPathEnvVar] ?? defaultConfigurationPath, 'utf-8'))
                return configurationSchema.parseAsync(json)
            }
        }
    ]
})
export class ConfigurationModule {}