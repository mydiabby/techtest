import { z } from 'zod'

export const configurationSchema = z.object({
    env: z.union([
        z.literal('dev'),
        z.literal('production')
    ]).default('production'),
    database: z.object({
        host: z.string().min(1).default('127.0.0.1'),
        port: z.number().min(1).max(65535).default(5432),
        database: z.string().min(1).optional(),
        schema: z.string().min(1).optional(),
        username: z.string().min(1),
        password: z.string().min(1),
        migrate: z.boolean().default(false)
    }),
    http: z.object({
        frontend: z.object({
            allowedOrigins: z.array(z.string().url()).min(1)
        }),
        allowedHosts: z.array(z.string().min(1)).min(1),
        trustProxy: z.boolean().default(false),
        bind: z.object({
            addr:  z.string().min(1).default('127.0.0.1'),
            port: z.number().min(1).max(65535).default(3000)
        }).default({}),
        openapi: z.object({
            expose: z.boolean().default(false)
        }).default({})
    })
})

export type Configuration = z.infer<typeof configurationSchema>