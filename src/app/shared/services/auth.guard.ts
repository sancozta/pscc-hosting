import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private fireauth: AngularFireAuth,
  ) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.fireauth.authState;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      console.log('AuthGuardErrorConsole')
    }
    return isLoggedIn;
  }
}