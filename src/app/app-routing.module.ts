import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "products", loadChildren: () => import("./components/product-list/product-list.module").then(m => m.ProductListModule), canActivate: [AuthGuard] },
  { path: "", pathMatch: "full", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
