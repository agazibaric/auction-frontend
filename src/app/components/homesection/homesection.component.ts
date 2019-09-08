import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-homesection",
  templateUrl: "./homesection.component.html",
  styleUrls: ["./homesection.component.scss"]
})
export class HomesectionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onRegister() {
    this.router.navigateByUrl("/register");
  }

  onLogin() {
    this.router.navigateByUrl("/login");
  }
}
