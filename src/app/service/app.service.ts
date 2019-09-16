import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class AppService {
  authenticated = false;
  username = "";
  password = "";
  baseApiUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  register(user: User) {
    let userForm = new FormData();
    userForm.append("username", user.username);
    userForm.append("email", user.email);
    userForm.append("password", user.password);
    userForm.append("passwordConfirm", user.passwordConfirm);
    return this.httpClient
      .post<any>(`${this.baseApiUrl}/registration`, userForm)
      .subscribe(
        data => {
          alert("You sign up successfully");
          this.authenticate(user.username, user.password).subscribe(data => {});
        },
        error => {
          alert("Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
          console.log(error);
        }
      );
  }

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
