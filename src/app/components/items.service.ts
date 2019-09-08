import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AppService } from "../service/app.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  itemsUrl = "http://localhost:8080/items";
  userItemsUrl = "http://localhost:8080/users/"; // later refactor into string format
  bidUrl = "http://localhost:8080/bid";

  constructor(private auth: AppService, private http: HttpClient) {}

  getItems() {
    return this.http.get(this.itemsUrl);
  }

  getUserItems(): Observable<any> {
    let userId = this.auth.getUserId();
    if (userId === null) return of<any[]>([]);
    return this.http.get(this.userItemsUrl + userId + "/items");
  }

  getHighestBidder(highestBidderHref) {
    return this.http.get<any>(highestBidderHref);
  }

  itemBid(bid, itemId) {
    console.log("Bidding...");
    let httpParams = new HttpParams()
      .append("itemId", itemId)
      .append("bid", bid);
    this.http.get<any>(this.bidUrl, { params: httpParams }).subscribe(
      data => {
        console.log("Succ bid");
        console.log(data);
      },
      error => {
        console.log("Fail bid");
        console.log(error);
      }
    );
  }
}
