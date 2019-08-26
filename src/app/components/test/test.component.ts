import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"]
})
export class TestComponent implements OnInit {
  constructor(private app: AppService, private http: HttpClient) {
    http.get("resource").subscribe(data => {
      console.log(data);
    });
  }

  authenticated() {
    return this.app.authenticated;
  }
  ngOnInit() {}
}
