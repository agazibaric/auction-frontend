import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  authenticated = false;

  constructor(private http: HttpClient) {}

  authenticate(credentials, callback) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              "Basic " + btoa(credentials.username + ":" + credentials.password)
          }
        : {}
    );

    this.http
      .get("http://localhost:8080/user", { headers: headers })
      .subscribe(response => {
        console.log("STIGLI: app.service.ts authencticate() " + response);
        if (response) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });
  }
}
