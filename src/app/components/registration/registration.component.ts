import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { User } from "src/app/model/user";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  model: User = new User();

  constructor(private auth: AppService) {}

  ngOnInit() {}

  onRegister() {
    this.auth.register(this.model);
  }
}
