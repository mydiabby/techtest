import { spawn } from 'child_process'
import { randomBytes } from 'crypto'

const name = process.env['MIGRATION_NAME'] ?? randomBytes(15).toString('hex')

const child = spawn(
    './node_modules/.bin/typeorm-ts-node-commonjs', 
    [
        'migration:generate',
        '-d',
        'migrations-datasource.ts',
        `migrations/${name}`
    ]
)

child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)

child.on('error', err => {
    console.error(err)
    process.exit(1)
})

child.on('exit', code => {
    if (!code){
        console.error('process exited without a code')
        process.exit(1)
    }

    if (code !== 0){
        console.error('process exited with non zero status code')
        process.exit(1)
    }
})