import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/service/app.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  credentials = { username: "", password: "" };

  constructor(
    private app: AppService,
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    console.log("HELLO");
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl("/");
    });
    return false;
  }

  ngOnInit() {}
}
