import { TypeormUserSchema } from '../../infrastructure/typeorm-user.schema'

export const TYPE_ORM_USER_SCHEMA_PROVIDER_TOKEN = 'TYPE_ORM_USER_SCHEMA_PROVIDER'

export const typeOrmUserSchemaProvider = {
    provide: TYPE_ORM_USER_SCHEMA_PROVIDER_TOKEN,
    useValue: TypeormUserSchema,
}
