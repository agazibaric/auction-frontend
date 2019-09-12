import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { ItemsService } from "../items.service";
import { AppService } from "src/app/service/app.service";
import * as moment from "moment";
import "moment/locale/pt-br";
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
  isExpired: boolean = false;

  constructor(private itemService: ItemsService, private auth: AppService) {}

  ngOnInit() {
    this.updateHighestBidder();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    moment.locale("hr");
    let itemDuration = moment.duration(this.item.duration);
    let endTime = moment(this.item.creationTime, "DD/MM/YYYY HH:mm")
      .add(itemDuration.asSeconds(), "seconds")
      .local();

    let endTimeFormat = endTime.format("YYYY/MM/DD HH:mm");

    console.log("this.item.creationTime: " + this.item.creationTime);
    console.log("Ending time local: " + endTimeFormat);
    console.log("Duration in minutes: " + itemDuration.asMinutes());
    console.log("IsExpired: " + !endTime.isAfter(moment().local(), "second"));

    let itemId = "#clock-" + this.item.id;
    let timeInfo: string;
    $(itemId).countdown(endTimeFormat, function(event) {
      if (endTime.isAfter(moment().local(), "second")) {
        let days = event.strftime("%D");
        let daysFormat = "";
        switch (days) {
          case "00":
            daysFormat = "";
            break;
          case "01":
            daysFormat = "1 dan";
            break;
          default:
            if (days.length) {
              daysFormat = days + " dana";
              if (days.charAt(0) == "0") {
                daysFormat = daysFormat.substring(1, daysFormat.length);
              }
            }
        }
        timeInfo = event.strftime(daysFormat + " %H:%M:%S");
      } else {
        timeInfo = "Expired!";
        //this.isExpired = true;
      }
      $(this).html(timeInfo);
    });
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
