import { Body, Controller, Get, Post, Query, UseFilters, UsePipes } from '@nestjs/common'
import { PaginateUsersUseCase } from '../../../domain/usecases/paginate-users.usecase'
import { AddUserUseCase } from '../../../domain/usecases/add-user.usecase'
import { UserResponse } from '../responses/user-response'
import { PageResponse, pageResponseOpenApiSchema } from '../../../../common/application/rest/responses/page-response'
import { AddUserBody, addUserBodySchema, addUserOpenApiSchema } from '../requests/add-user-body'
import { UserResponseMapper } from '../mappers/user-response.mapper'
import { PaginateUsersQuery, paginateUsersQueryOpenApiSchema, paginateUsersQuerySchema } from '../requests/paginate-users-query'
import { ZodValidationPipe } from '../../../../common/application/rest/pipes/zod.pipe'
import { UserExceptionsFilter } from '../filters/user-exceptions.filter'
import { ApiBody, ApiConflictResponse, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { ApiQueryParameters, GenericRestResponses } from '../../../../common/application/rest/openapi/helpers'
import { ErrorResponse } from '../../../../common/application/rest/responses/error-response'

/**
 * API des utilisateurs.
 */
@ApiTags('users')
@Controller('/users')
@UseFilters(UserExceptionsFilter)
@GenericRestResponses()
export class UsersController {
    constructor(
        private readonly paginateUsers: PaginateUsersUseCase,
        private readonly addUser: AddUserUseCase,
        private readonly mapper: UserResponseMapper
    ) { }

    @Get()
    @ApiExtraModels(UserResponse)
    @ApiOkResponse({
        description: 'A page of users is returned.',
        schema: pageResponseOpenApiSchema(getSchemaPath(UserResponse))
    })
    @ApiQueryParameters(paginateUsersQueryOpenApiSchema)
    @UsePipes(new ZodValidationPipe(paginateUsersQuerySchema))
    async paginate(@Query() query: PaginateUsersQuery): Promise<PageResponse<UserResponse>> {
        const page = await this.paginateUsers.paginate({
            itemsPerPage: query.itemsPerPage,
            page: query.page
        })
        return new PageResponse(
            page.items.map(user => this.mapper.fromDomainUser(user)), 
            page.total
        )
    }

    @Post()
    @ApiOkResponse({
        description: 'The user was created.',
        type: UserResponse
    })
    @ApiConflictResponse({
        description: 'The user already exists.',
        type: ErrorResponse
    })
    @ApiBody({
        schema: addUserOpenApiSchema,
        description: 'User creation parameters.'
    })
    @UsePipes(new ZodValidationPipe(addUserBodySchema))
    async add(@Body() body: AddUserBody): Promise<UserResponse> {
        const user = await this.addUser.add({
            firstname: body.firstname,
            lastname: body.lastname
        })
        return this.mapper.fromDomainUser(user)
    }
}
