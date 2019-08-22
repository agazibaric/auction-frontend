import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  configUrl = 'http://localhost:8080/items';

  getItems() {
    return this.http.get(this.configUrl);
  }

  constructor(private http: HttpClient) { }
}
