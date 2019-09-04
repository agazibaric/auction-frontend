import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { TestComponent } from "./components/test/test.component";
import { LoginComponent } from "./components/login/login.component";
import { MyitemsComponent } from "./components/myitems/myitems.component";
import { RegistrationComponent } from "./components/registration/registration.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: MainComponent },
  { path: "myitems", component: MyitemsComponent },
  { path: "test", component: TestComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
