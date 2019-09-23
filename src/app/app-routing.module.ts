import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { TestComponent } from "./components/test/test.component";
import { LoginComponent } from "./components/login/login.component";
import { MyitemsComponent } from "./components/myitems/myitems.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { AddItemComponent } from "./components/add-item/add-item.component";
import { HighestBidderComponent } from "./components/highest-bidder/highest-bidder.component";
import { WonitemsComponent } from "./components/wonitems/wonitems.component";
import { ItemImagesComponent } from "./components/item-images/item-images.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: MainComponent },
  { path: "myitems", component: MyitemsComponent },
  { path: "test", component: TestComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "additem", component: AddItemComponent },
  { path: "highestbidder", component: HighestBidderComponent },
  { path: "wonitems", component: WonitemsComponent },
  { path: "images", component: ItemImagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
