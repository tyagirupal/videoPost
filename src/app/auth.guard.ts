import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import {  } from '../services/login-profile.service';
import { LoginProfileService } from './login-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private snackBar :MatSnackBar,private loginService: LoginProfileService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
  //   if (this.loginService.getLoginData()) {
  //     localStorage.setItem
  //     return true;
  //   }
    
  //   this.router.navigate(['/login']);
  //   alert("plaese login");
  //   return false;
  // }
  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('form'); 
    
    
    if (!isAuthenticated) {
      this.snackBar.open('Access Denied! Please log in.', 'OK', {
        duration: 3000, 
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'] 
      });
      this.router.navigate(['/login']); 
      return false;
    }
    return true;
  }
}
