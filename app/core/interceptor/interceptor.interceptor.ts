import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken') || '';
      const userId = localStorage.getItem('userId') || '';
      const modifiedRequest = request.clone({
        setHeaders: {
          'BEARER': token,
          'USER-ID': userId,
        },
      });
      return next.handle(modifiedRequest)
    }
    return next.handle(request)
  }
}
