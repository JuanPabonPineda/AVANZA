import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {NavigationComponent} from "../shared/navigation/navigation.component";
import {ProductsComponent} from "./products/products.component";

const routes: Routes = [

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  // // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // {path: '404', redirectTo: 'admin', pathMatch: 'full'},
  // {path: '', component: AdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'navigation', component: NavigationComponent},
  {path: 'productos', component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
