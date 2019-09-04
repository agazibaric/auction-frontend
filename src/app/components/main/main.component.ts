import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(private app: AppService, private http: HttpClient) {}

  ngOnInit() {}
}
