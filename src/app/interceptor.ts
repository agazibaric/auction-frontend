import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { AppService } from "./service/app.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AppService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("INTERCEPT");
    if (this.auth.isUserLoggedIn()) {
      console.log("LOGGED");
      request = request.clone({
        setHeaders: {
          Authorization: "Basic " + this.auth.getToken()
        }
      });
    } else {
      console.log("NOT LOGGED");
    }
    return next.handle(request);
  }
}
