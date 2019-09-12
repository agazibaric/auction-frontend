import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/service/app.service";
import { HttpClient } from "@angular/common/http";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  username = "nick";
  password = "pass";

  constructor(private app: AppService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    console.log("onLogin");
    this.app.authenticate(this.username, this.password).subscribe(
      data => {
        console.log("Stigli podaci onLogin subscribe");
        console.log(data);
        localStorage.setItem("username", this.username);
        localStorage.setItem("password", this.password);

        //this.router.navigateByUrl("/");
        this.router
          .navigateByUrl("/test", { skipLocationChange: true })
          .then(() => this.router.navigate(["/"]));
      },
      error => {
        alert("Invalid username or password");
      }
    );
  }
}
