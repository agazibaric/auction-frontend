import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AppService, private router: Router) {}

  isLoggedIn: boolean;
  username: string;

  ngOnInit() {
    this.username = this.auth.getUsername();
    this.isLoggedIn = Boolean(this.username);
  }

  logout() {
    this.auth.logOut();
    this.isLoggedIn = false;
    this.username = null;
    this.router.navigateByUrl("/");
  }
  
}
