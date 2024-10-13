import { UserRepository } from '../ports/user.epository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

export class AddUserCommand {
    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
    ) {}
}

@CommandHandler(AddUserCommand)
export class AddUserHandler implements ICommandHandler<AddUserCommand> {
    constructor(private readonly _userRepository: UserRepository) {}

    async execute(command: AddUserCommand): Promise<void> {
        await this._userRepository.create(command)
    }
}
