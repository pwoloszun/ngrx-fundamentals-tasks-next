import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataApiService } from '@api/data-api.service';
import { map } from 'rxjs/operators';

interface AuthInfo {
  id: number;
  login: string;
  password: string;
  roleId: string;
}

type AuthInfoParams = Omit<AuthInfo, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends DataApiService<AuthInfo>{

  authenticate(authParams: AuthInfoParams): Observable<boolean> {
    const { login } = authParams;
    return this.search({ login }).pipe(
      map((entities) => {
        if (entities.length < 1) {
          return false;
        } else {
          const [authInfo] = entities;
          const { login, password, roleId } = authInfo;
          return password === authParams.password &&
            roleId === authParams.roleId &&
            login === authParams.login;
        }
      })
    );
  }

  getUrl(): string {
    return '/api/auth-info';
  }

}
