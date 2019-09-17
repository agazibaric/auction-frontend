import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../items.service";

@Component({
  selector: "app-highest-bidder",
  templateUrl: "./highest-bidder.component.html",
  styleUrls: ["./highest-bidder.component.scss"]
})
export class HighestBidderComponent implements OnInit {
  items = [];

  constructor(private itemService: ItemsService) {}

  ngOnInit() {
    this.itemService.getHighestBidderItems().subscribe(data => {
      console.log(data);
      this.items = data["_embedded"].items;
    });
  }
}
