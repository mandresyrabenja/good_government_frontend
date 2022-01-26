import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from './layouts/login/login.component';
import AuthGuard from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    redirectTo: "admin/statistic",
    pathMatch: "full"
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(
      routes,
      {
        useHash: true
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
