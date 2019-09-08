import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { ItemsService } from "../items.service";
import { AppService } from "src/app/service/app.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  bidPrice: number;
  highestBidder: string;

  constructor(private itemService: ItemsService, private auth: AppService) {}

  ngOnInit() {
    this.updateHighestBidder();
  }

  updateHighestBidder() {
    this.itemService
      .getHighestBidder(this.item._links["highestBidder"].href)
      .subscribe(
        data => {
          this.item.highestBidder = data["username"];
        },
        error => {
          console.log(error);
          this.item.highestBidder = null;
        }
      );
  }

  onBid(event: Event) {
    if (!this.auth.isUserLoggedIn()) {
      alert("You have to be logged in to make a bid!");
      return;
    }
    let bid = this.item.bidPrice;
    console.log(bid);
    console.log(this.bidPrice);
    if (this.bidPrice <= bid) {
      alert("You have to bid more then current price which is " + bid + "$");
    } else {
      alert("You are now highest bidder!");
      this.item.bidPrice = this.bidPrice;
      this.item.numberOfBids++;
      this.item.highestBidder = this.auth.getUsername();
      this.itemService.itemBid(this.bidPrice, this.item.id);
    }
  }
}

export class Item {
  id: string;
  bidPrice: number;
  creationTime: string;
  description: string;
  duration: string;
  minimumPrice: number;
  name: string;
  numberOfBids: number;
  highestBidder: string;
  _links: string;
}
