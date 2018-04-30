// src/app/auth/admin.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

    private role = sessionStorage.getItem('roles');

  constructor(
    private auth: AuthenticationService,
    private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.admin  == true) {
      console.log('admin')
      return true;
    }
    this.router.navigate(['/dashboard/profile']);
    return false;
  }

}