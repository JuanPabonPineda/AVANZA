import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-billing',
  templateUrl: 'billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
  ) {
  }

  onLogout(event: boolean) {
    if (event) {
      this._authenticationService.logout();
      this._router.navigate(['/login']);
    }
  }
}
