import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent implements OnInit {
    constructor(
      private router: Router,
      private auth: AuthService
    ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  onLogin(): void {
    this.auth.loginWithRedirect();
  }
}
