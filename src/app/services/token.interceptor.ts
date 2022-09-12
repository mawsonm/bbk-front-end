import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string | undefined;
  constructor(private authService: AuthService) {
    this.authService.token$.subscribe((tok) => {
      this.token = tok;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`),
      });
      console.log(request);
    }
    return next.handle(request);
  }
}
