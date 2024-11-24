import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) {
    // redirect to home if already logged in
    if (localStorage.getItem('isLogged') == 'true') {
      this.router.navigate(['admin']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/admin'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.value;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username, this.f.password)
      .subscribe({
        next: response => {
          if (response.data.rol == 'Admin') {
            this.router.navigate([this.returnUrl]);
          }else {
            this.router.navigate(['/billing']);
          }
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });

  }
}
