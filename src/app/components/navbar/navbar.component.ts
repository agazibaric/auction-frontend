import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AppService) {}

  ngOnInit() {}

  logout() {
    this.auth.logOut();
  }
}
