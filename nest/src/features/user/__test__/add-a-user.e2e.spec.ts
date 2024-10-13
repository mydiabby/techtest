import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../_common/app/app.module'
import { DatabaseModule } from '../../../_common/db/database.module'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { Server } from 'http'
import * as request from 'supertest'
import { User } from '../business/models/user'
import { DUPLICATE_USER_EXCEPTION_MESSAGE } from '../infrastructure/typeorm-user.repository'

describe('Add a user e2e test', () => {
    let sut: SUT
    let postgresContainer: StartedPostgreSqlContainer
    let app: INestApplication
    let id: string
    let firstName: string
    let lastName: string

    beforeAll(async () => {
        postgresContainer = await new PostgreSqlContainer('postgres:16.1-alpine3.19').start()

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideModule(DatabaseModule)
            .useModule(
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: postgresContainer.getHost(),
                    port: postgresContainer.getMappedPort(5432),
                    username: postgresContainer.getUsername(),
                    password: postgresContainer.getPassword(),
                    database: postgresContainer.getDatabase(),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            )
            .compile()
        app = moduleRef.createNestApplication()
        app.useGlobalPipes(new ValidationPipe({ transform: true }))
        await app.init()
    })

    beforeEach(async () => {
        sut = new SUT(app)
        await sut.clear()
        id = '4edc9a9e-90ca-4249-991c-870dd57c60ec'
        firstName = 'Dark'
        lastName = 'Vador'
    })

    afterAll(async () => {
        await postgresContainer.stop()
        await app.close()
    })

    it('should save a new user', async () => {
        const response = await sut.addAUser({ id, firstName, lastName })

        expect(response.status).toBe(201)
        expect(await sut.retrieveUsers()).toHaveLength(1)
        expect(await sut.retrieveUsers()).toEqual([new User(id, firstName, lastName)])
    })

    it('should not save a new user if the id is not an uuid', async () => {
        const response = await sut.addAUser({ id: 'not-an-uuid', firstName, lastName })

        expect(response.status).toBe(400)
        expect(await sut.retrieveUsers()).toHaveLength(0)
    })

    it('should not save a new user if the firstName length is less than 2', async () => {
        const response = await sut.addAUser({ id, firstName: 'D', lastName })

        expect(response.status).toBe(400)
        expect(await sut.retrieveUsers()).toHaveLength(0)
    })

    it('should not save a new user if the lastName length is less than 2', async () => {
        const response = await sut.addAUser({ id, firstName, lastName: 'V' })

        expect(response.status).toBe(400)
        expect(await sut.retrieveUsers()).toHaveLength(0)
    })

    it('should not save a new user if the couple of firstName and LastName is already used', async () => {
        await sut.givenAUserExists(new User(id, firstName, lastName))

        await sut.addAUser({ id: '201dfbda-ed81-49ae-a1d8-61674ad369b0', firstName, lastName })

        const response = await sut.addAUser({ id: '4edc9a9e-90ca-4249-991c-870dd57c60ed', firstName, lastName })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe(DUPLICATE_USER_EXCEPTION_MESSAGE)
        expect(await sut.retrieveUsers()).toHaveLength(1)
    })
})

class SUT {
    private readonly _server: Server

    constructor(private readonly _app: INestApplication) {
        this._server = this._app.getHttpServer()
    }

    async addAUser(param: { id: string; firstName: string; lastName: string }) {
        return request(this._server).post('/users').send(param)
    }

    async retrieveUsers() {
        return this._app.get(getRepositoryToken(User)).createQueryBuilder('user').getMany()
    }

    async givenAUserExists(user: User) {
        await this._app.get(getRepositoryToken(User)).createQueryBuilder('user').insert().values(user).execute()
    }

    async clear() {
        await this._app.get(getRepositoryToken(User)).createQueryBuilder('user').delete().execute()
    }
}
