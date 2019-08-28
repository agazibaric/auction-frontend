import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AppService } from './service/app.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("intercept")
      console.log("INT: " + this.auth.username)
    request = request.clone({
      setHeaders: {
        Authorization: 'Basic ' + btoa(this.auth.getUsername() + ':' + this.auth.getPass())
      }
    });
    return next.handle(request);
  }

}
