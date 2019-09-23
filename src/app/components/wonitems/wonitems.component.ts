import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../items.service";

@Component({
  selector: "app-wonitems",
  templateUrl: "./wonitems.component.html",
  styleUrls: ["./wonitems.component.scss"]
})
export class WonitemsComponent implements OnInit {
  items = [];

  constructor(private itemService: ItemsService) {}

  ngOnInit() {
    this.itemService.getWonItems().subscribe(data => {
      console.log(data);
      this.items = data["_embedded"].items;
    });
  }
}
