import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_ROOT } from 'sensitive/sensitive';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | undefined;
  constructor(private http: HttpClient) {}

  login(username: string | null, password: string | null) {
    let body = {
      username: username,
      password: password,
    };
    return this.http.post(API_ROOT + '/authenticate', body);
  }

  register(obj: any) {
    let body = {
      firstName: obj.firstName,
      lastName: obj.lastName,
      userName: obj.userName,
      password: obj.passwords.password,
    };

    return this.http.post(API_ROOT + '/register', body);
  }
}
