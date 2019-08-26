import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injectable } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import {
  HttpClientModule,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { ItemsComponent } from "./components/items/items.component";
import { ItemComponent } from "./components/item/item.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./components/footer/footer.component";
import { HomesectionComponent } from "./components/homesection/homesection.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./components/main/main.component";
import { TestComponent } from "./components/test/test.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from "@angular/forms";
import { AppService } from "./service/app.service";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set("X-Requested-With", "XMLHttpRequest")
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsComponent,
    ItemComponent,
    FooterComponent,
    HomesectionComponent,
    MainComponent,
    TestComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
