import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

//angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';

//components
import {AppComponent} from './app.component';

//angular-material
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

import {LoginComponent} from './login/login.component';
import {AdminComponent} from "./admin/admin.component";
import {AdminModule} from "./admin/admin.module";
import {SharedModule} from "./shared/shared.module";
import {JwtInterceptor} from "./commons/jwt.interceptor";
import {ErrorInterceptor} from "./commons/error.interceptor";
import {AlertComponent} from "./alert/alert.component";
import { BillingComponent } from './billing/billing.component';
import {SoloLetrasDirective} from "./shared/directives/soloLetras.directive";
import {AutocompletePositionDirective} from "./shared/directives/autocompletePositionDirective .directive";
import {SinCaracteresEspecialesDirective} from "./shared/directives/sinCaracteresEspeciales.directive";
import {PositionPseDirective} from "./shared/directives/positionPseDirective.directive";
import {SoloLetrasConTildesDirective} from "./shared/directives/soloLetrasConTildes.directive";
import {SoloNumerosDirective} from "./shared/directives/soloNumeros.directive";
import {SoloNumerosYComasDirective} from "./shared/directives/soloNumerosYComas.directive";
import {SoloNumerosYPuntosDirective} from "./shared/directives/soloNumerosYPuntos.directive";
import {BillingModule} from "./billing/billing.module";


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AlertComponent,
    BillingComponent,

    //directives
    AutocompletePositionDirective,
    SoloLetrasDirective,
    SinCaracteresEspecialesDirective,
    PositionPseDirective,
    SoloLetrasConTildesDirective,
    SoloNumerosDirective,
    SoloNumerosYComasDirective,
    SoloNumerosYPuntosDirective,

  ],
  imports: [
    SharedModule,
    AdminModule,
    BillingModule,
    AppRoutingModule,

    RouterModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
        },
        deps: [HttpClient]
      },
    }),
  ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        SoloNumerosDirective
    ],
  providers: [DatePipe,// format date
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
