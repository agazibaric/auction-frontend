import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { ItemsService } from "../items.service";
import { AppService } from "src/app/service/app.service";
declare var moment: any;
declare var $: any;

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  bidPrice: number = 0;
  highestBidder: string = "";

  constructor(private itemService: ItemsService, private auth: AppService) {}

  ngOnInit() {
    this.updateHighestBidder();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log("-----------------");
    let itemId = "#clock-" + this.item.id;
    console.log(itemId);
    $(itemId).countdown("2020/10/10", function(event) {
      $(this).html(event.strftime("%D days %H:%M:%S"));
    });
    /*  $(function() {
      $('[data-toggle="popover"]').popover();
    }); */
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
    let currentBid = this.item.bidPrice;
    if (this.bidPrice <= 0) {
      alert("You have to bid more then 0!");
    } else if (this.bidPrice <= currentBid) {
      alert(
        "You have to bid more then current price which is " + currentBid + "$"
      );
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
