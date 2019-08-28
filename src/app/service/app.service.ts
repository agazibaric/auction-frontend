import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AppService {
  authenticated = false;
  username = ""
  password = ""

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) {
    console.log("AUTHENTICATE")
    this.username = username
    this.password = password
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    /* return this.httpClient.get<any>('http://localhost:8080/user')
    .pipe(map(
      userData => {
        console.log("Successful")
        console.log(userData)
        this.username = username
        this.password = password
        this.authenticated = true
       localStorage.setItem('username', username);
       localStorage.setItem('username', password);
       return userData;
      }
    )) */
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  getPass() {
    return localStorage.getItem("password");
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    localStorage.removeItem('username')
  }
}
