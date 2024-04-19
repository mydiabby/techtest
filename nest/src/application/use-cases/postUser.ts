import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";
import { PostUserDto } from "src/domain/dto/post-user.dto";

@Injectable()
export class PostUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService
  ) { }

  async execute(postUserDto: PostUserDto): Promise<User> {
    return await this.userService.postUser(postUserDto);
  }
}
