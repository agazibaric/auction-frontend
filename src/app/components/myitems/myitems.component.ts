import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../items.service";

@Component({
  selector: "app-myitems",
  templateUrl: "./myitems.component.html",
  styleUrls: ["./myitems.component.scss"]
})
export class MyitemsComponent implements OnInit {
  items = [];
  constructor(private service: ItemsService) {}

  ngOnInit() {
    this.service.getUserItems().subscribe(data => {
      console.log(data);
      this.items = data["_embedded"].items;
    });
  }
}
