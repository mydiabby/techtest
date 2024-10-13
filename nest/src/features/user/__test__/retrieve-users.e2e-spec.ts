import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../_common/app/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseModule } from '../../../_common/db/database.module'
import { User } from '../business/models/user'
import { UserTestBuilder } from '../../../_common/__test__/builders/user-test.builders'
import * as request from 'supertest'
import { Server } from 'http'
import { UserVM } from '../business/models/user-vm'

describe('Retrieve users e2e test', () => {
    let sut: SUT
    let postgresContainer: StartedPostgreSqlContainer
    let app: INestApplication
    let users: User[]

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
    })

    afterAll(async () => {
        await postgresContainer.stop()
        await app.close()
    })

    it('should return all users', async () => {
        users = [
            new UserTestBuilder()
                .withId('1a662fc6-5168-47f2-9659-455d553a7b71')
                .withFirstName('Jane')
                .withLastName('Doe')
                .build(),
            new UserTestBuilder()
                .withId('1a662fc6-5168-47f2-9659-455d553a7b72')
                .withFirstName('John')
                .withLastName('Doe')
                .build(),
        ]

        await sut.givenUsers(users)

        const response = await sut.retrieveUsers()

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(2)

        expect(response.body[0]).toEqual(new UserVM(users[0].id, users[0].getFullName()))
        expect(response.body[1]).toEqual(new UserVM(users[1].id, users[1].getFullName()))
    })

    it('should return all users sorted by alphabetical order', async () => {
        users = [
            new UserTestBuilder()
                .withId('1a662fc6-5168-47f2-9659-455d553a7b70')
                .withFirstName('Xavier')
                .withLastName('Doe')
                .build(),
            new UserTestBuilder()
                .withId('1a662fc6-5168-47f2-9659-455d553a7b71')
                .withFirstName('Nathan')
                .withLastName('Doe')
                .build(),
            new UserTestBuilder()
                .withId('1a662fc6-5168-47f2-9659-455d553a7b72')
                .withFirstName('Nathan')
                .withLastName('Babayaga')
                .build(),
            new UserTestBuilder()
                .withId('1a662fc6-5168-47f2-9659-455d553a7b73')
                .withFirstName('Albert')
                .withLastName('Doe')
                .build(),
        ]

        await sut.givenUsers(users)

        const response = await sut.retrieveUsers()

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(4)

        expect(response.body.map((u: UserVM) => u.id)).toEqual([users[3].id, users[2].id, users[1].id, users[0].id])
    })
})

class SUT {
    private readonly _server: Server

    constructor(private readonly _app: INestApplication) {
        this._server = this._app.getHttpServer()
    }

    async givenUsers(users: User[]) {
        await this._app.get(getRepositoryToken(User)).createQueryBuilder('user').insert().values(users).execute()
    }

    async retrieveUsers() {
        return request(this._server).get('/users')
    }

    async clear() {
        await this._app.get(getRepositoryToken(User)).createQueryBuilder('user').delete().execute()
    }
}
