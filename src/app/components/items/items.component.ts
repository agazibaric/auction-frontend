import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../items.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  items = [];
  data = {};

  constructor(private service: ItemsService) {}
  ngOnInit() {
    this.service.getItems().subscribe(data => {
      console.log(data);
      this.data = data;
      this.items = data["_embedded"].items;
    });
  }
}
