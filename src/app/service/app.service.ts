import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  authenticated = false;
  username = "";
  password = "";

  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string): Observable<any> {
    console.log("AUTHENTICATE");
    let token = btoa(username + ":" + password);
    const headers = new HttpHeaders({
      Authorization: "Basic " + token
    });
    return this.httpClient
      .get<any>("http://localhost:8080/user", { headers })
      .pipe(
        map(userData => {
          console.log("Successful");
          console.log(userData);
          this.username = username;
          this.password = password;
          this.authenticated = true;
          localStorage.setItem("id", userData["id"]);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          localStorage.setItem("token", token);
          return userData;
        })
      );
  }

  getUserId() {
    if (!this.isUserLoggedIn) return null;
    return localStorage.getItem("id");
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  getPass() {
    return localStorage.getItem("password");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isUserLoggedIn() {
    let user = localStorage.getItem("username");
    console.log("IS user logged in: " + !(user === null));
    return !(user === null);
  }

  logOut() {
    console.log("Logged out!");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
}
