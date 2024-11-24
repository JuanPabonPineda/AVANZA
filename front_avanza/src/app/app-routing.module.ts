import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./commons/auth.guard";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {UsuariosComponent} from "./admin/usuarios/usuarios.component";
import {ProductsComponent} from "./admin/products/products.component";
import {LoginComponent} from "./login/login.component";
import {BillingComponent} from "./billing/billing.component";
import {BillingRecordComponent} from "./billing/billing-record/billing-record.component";
import {BillingProductsComponent} from "./billing/billing-products/billing-products.component";

const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '404', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: 'productos', component: ProductsComponent},
    ]
  },
  {
    path: 'billing', component: BillingComponent, canActivate: [AuthGuard],
    children: [
      {path: 'record', component: BillingRecordComponent},
      {path: 'products', component: BillingProductsComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
