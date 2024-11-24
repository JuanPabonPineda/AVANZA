import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
  ) { }

  onLogout(event: boolean) {
    if(event){
      this._authenticationService.logout();
      this._router.navigate(['/login']);
    }
  }
}
