import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Auction';
  greeting = {};
  constructor(private http: HttpClient) {
    http.get('http://localhost:8080/items').subscribe(data => {
      this.greeting['id'] = data['_embedded'].items[0].name;
    });
  }
}
