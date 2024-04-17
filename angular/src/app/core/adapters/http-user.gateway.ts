import { inject } from '@angular/core';
import { UserGateway } from '../ports/user.gateway';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export class HttpUserGateway extends UserGateway {

  private http = inject(HttpClient);

  getUrl(path: string) {
    return `${environment.apiUrl}/${path}`;
  }

  override retrieveAll(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl('users'));
  }
}
