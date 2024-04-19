import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { PostUserDto } from "../models/dto/post-user.dto";

export abstract class UserGateway {
  abstract retrieveAll(): Observable<string[]>;
  abstract post(dto: PostUserDto): Observable<User>;
}
