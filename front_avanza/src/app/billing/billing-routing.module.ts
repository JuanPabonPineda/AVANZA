import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BillingRecordComponent} from "./billing-record/billing-record.component";
import {BillingProductsComponent} from "./billing-products/billing-products.component";

const routes: Routes = [

  {path: '', redirectTo: '/record', pathMatch: 'full'},
  {path: 'record', component: BillingRecordComponent},
  {path: 'products', component: BillingProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule {
}
