import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { ItemsService } from "../items.service";
import { AppService } from "src/app/service/app.service";
import * as moment from "moment";
import "moment/locale/pt-br";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
declare var $: any;

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Input() item: Item = new Item();
  bidPrice: number = 0;
  highestBidder: string = "";
  itemImage: File;
  image: Observable<string>;
  imagePath: string;
  isExpired: boolean;
  isHighestBidder: boolean = false;

  constructor(private itemService: ItemsService, private auth: AppService) {}

  ngOnInit() {
    this.updateHighestBidder();
    this.updateItemUser();
    this.imagePath = "http://localhost:8080/items/" + this.item.id + "/image";
  }

  ngAfterContentInit() {}

  setIsExpired(isExpired: boolean) {
    this.item.isExpired = isExpired;
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

    let itemId = "#clock-" + this.item.id;
    let timeInfo: string;
    $(itemId).countdown(endTimeFormat, function(event) {
      moment.locale("hr");
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
          if (this.item.highestBidder == this.auth.getUsername()) {
            this.isHighestBidder = true;
          }
        },
        error => {
          // There is no highest bidder for this item
          this.item.highestBidder = null;
        }
      );
  }

  updateItemUser() {
    this.itemService.getItemUser(this.item._links["user"].href).subscribe(
      data => {
        this.item.user = data["username"];
      },
      error => {
        console.log(error);
      }
    );
  }

  isYourItem() {
    return this.item.user == this.auth.getUsername();
  }

  onBid(event: Event) {
    if (!this.auth.isUserLoggedIn()) {
      alert("You have to be logged in to make a bid!");
      return;
    }
    let currentUser = this.auth.getUsername();

    if (currentUser == this.item.user) {
      alert("You can not bid on your own item!");
      return;
    }

    if (this.item.isExpired == true) {
      alert("Item has expired!");
      return;
    }

    let currentBid = this.item.bidPrice;
    if (this.bidPrice <= 0) {
      alert("You have to bid more then 0!");
      return;
    }
    if (this.bidPrice <= currentBid) {
      alert(
        "You have to bid more then current price which is " + currentBid + "$"
      );
      return;
    }

    if (this.item.highestBidderPrice < this.bidPrice) {
      if (this.item.highestBidder == currentUser) {
        this.item.highestBidderPrice = this.bidPrice;
      } else {
        this.item.bidPrice = this.item.highestBidderPrice;
        this.item.highestBidderPrice = this.bidPrice;
        this.item.numberOfBids++;
        this.item.highestBidder = currentUser;
        this.isHighestBidder = true;
      }
      this.itemService.itemBid(this.bidPrice, this.item.id).subscribe(
        data => {
          console.log(data);
          alert("You are now highest bidder!");
        },
        error => {
          console.log("ERROR");
          console.log(error);
          alert("STATUS: " + error.status + "\nMESSAGE: " + error.error);
        }
      );
    } else if (
      this.item.bidPrice < this.bidPrice &&
      this.item.highestBidder != currentUser
    ) {
      this.item.bidPrice = this.bidPrice;
      this.item.numberOfBids++;
      this.itemService.itemBid(this.bidPrice, this.item.id).subscribe(
        data => {
          console.log(data);
          alert("Bid price has not exceeded highest bid price!");
        },
        error => {
          console.log("ERROR");
          console.log(error);
          alert("STATUS: " + error.status + "\nMESSAGE: " + error.error);
        }
      );
    }
  }
}

export class Item {
  id: string;
  bidPrice: number;
  highestBidderPrice: number;
  creationTime: string;
  description: string;
  duration: string;
  minimumPrice: number;
  name: string;
  numberOfBids: number;
  highestBidder: string;
  user: string;
  isExpired: boolean;
  _links: string;
  image: any;
}
