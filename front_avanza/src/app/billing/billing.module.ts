import {NgModule} from "@angular/core";

//angular-material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";

//angular
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DatePipe} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {LayoutModule} from "@angular/cdk/layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {YouTubePlayerModule} from "@angular/youtube-player";
// import {RouterModule} from "@angular/router";

//others
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

//components
import {SharedModule} from "../shared/shared.module";
import {BillingProductsComponent} from "./billing-products/billing-products.component";
import {AppRoutingModule} from "../app-routing.module";
import {BillingComponent} from "./billing.component";
import {BillingRecordComponent} from "./billing-record/billing-record.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { PaymentModalComponent } from './billing-record/payment-modal/payment-modal.component';
import {AdminModule} from "../admin/admin.module";

@NgModule({
  declarations: [
    BillingProductsComponent,
    BillingRecordComponent,
    PaymentModalComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    YouTubePlayerModule,
    SweetAlert2Module,
    AdminModule,
  ],
  exports: [],
  providers: [DatePipe, MatSnackBar], // format date
  bootstrap: [BillingComponent],
})
export class BillingModule {
}
