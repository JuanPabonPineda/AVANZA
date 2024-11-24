import {NgModule} from '@angular/core';

//components
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {ProductsComponent} from "./products/products.component";
import {UsersTableComponent} from "./usuarios/users-table/users-table.component";
import {DialogUserEditComponent} from "./usuarios/dialogs/dialog-user-edit/dialog-user-edit.component";
import {ProductsTableComponent} from "./products/products-table/products-table.component";
import {ProductsFormComponent} from "./products/products-form/products-form.component";
import {AdminComponent} from './admin.component';
import {SharedModule} from "../shared/shared.module";
import {AppRoutingModule} from "../app-routing.module";

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
import { DialogProductEditComponent } from './products/dialogs/dialog-product-edit/dialog-product-edit/dialog-product-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    ProductsComponent,
    UsersTableComponent,
    DialogUserEditComponent,
    ProductsTableComponent,
    ProductsFormComponent,
    DialogProductEditComponent,
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
    // RouterModule,
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
  ],
  exports: [
    ProductsTableComponent,
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
  ],
  providers: [DatePipe], // format date
  bootstrap: [AdminComponent],
})
export class AdminModule {
}
