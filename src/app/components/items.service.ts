import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "../service/app.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  itemsUrl = "http://localhost:8080/items";
  userItemsUrl = "http://localhost:8080/users/"; // later refactor into string format

  constructor(private auth: AppService, private http: HttpClient) {}

  getItems() {
    return this.http.get(this.itemsUrl);
  }

  getUserItems(): Observable<any> {
    let userId = this.auth.getUserId();
    if (userId === null) return of<any[]>([]);
    return this.http.get(this.userItemsUrl + userId + "/items");
  }
}
