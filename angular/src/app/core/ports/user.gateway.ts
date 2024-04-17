import { Observable } from "rxjs";

export abstract class UserGateway {
  abstract retrieveAll(): Observable<string[]>;
}
