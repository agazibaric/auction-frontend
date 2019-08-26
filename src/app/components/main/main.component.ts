import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(private app: AppService, private http: HttpClient) {
    http.get("http://localhost:8080/token").subscribe(
      data => {
        const token = data["token"];
        http
          .get("http://localhost:8080", {
            headers: new HttpHeaders().set("X-Auth-Token", token)
          })
          .subscribe(response => console.log(response));
      },
      () => {}
    );
  }

  ngOnInit() {}
}
