import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/app';

import { FirebaseService } from './../services/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {

  loggedInSubject: ReplaySubject<firebase.User>;

  constructor(private firebase: FirebaseService, private router: Router) {
    this.loggedInSubject = new ReplaySubject<firebase.User>(1);
    this.firebase.bindChangeStateAuth(this.loggedInSubject);
  }

  canActivate(): Observable<boolean> {
    return this.loggedInSubject
      .pipe(map(user => {
        console.log('Authenticate: ', !!user);
        console.log('Authenticate: ', user);
        if (!user) {
          this.router.navigate(['admin/login']);
        }
        return !!user;
      }))
      .pipe(take(1));
  }
}
