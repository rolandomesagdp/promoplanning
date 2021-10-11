import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "@pp-core/auth/authentication-guard/authentication.guard";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [ AuthenticationGuard ] }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }