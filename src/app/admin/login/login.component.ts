import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../shared/services/firebase.service';
import { UtilsService } from '../shared/services/utils.service';

import { User } from './../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading: boolean;

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.firebase.data.subscribe((data) => {
      if (data) {
        this.router.navigate(['/admin']);
      } else {
        this.loading = false;
      }
    });
  }

  enabledLoginOrSignup(): boolean {
    return !this.email || !this.password;
  }

  signup() {
    this.firebase.signup(this.email, this.password)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        this.utils.snackBar(error.message);
      });
    this.clearFields();
  }

  login() {
    this.firebase.login(this.email, this.password)
      .then((data) => {
        if (data) {
          this.router.navigate(['/admin']);
        } else {
          this.utils.snackBar('Não foi possível realizar o login!');
        }
      })
      .catch((error) => {
        this.utils.snackBar(error.message);
      });
    this.clearFields();
  }

  loginWithGoogle() {
    this.firebase.loginWithGoogle()
      .then((data) => {
        if (!data) {
          this.utils.snackBar('Não foi possível realizar o login com o Google!');
        } else {
          this.firebase.getDocUser(data.uid).subscribe((d: User) => {
            console.log('Usuário Logado: ', d);
            this.firebase.user = d;
            if (!!d.admin) {
              this.firebase.admin = d.admin;
              this.router.navigate(['/admin']);
            } else {
              this.utils.snackBar('Seu usuário não tem perfil administrador!');
            }
          });
        }
      })
      .catch((error) => {
        this.utils.snackBar(error.message);
      });
    this.clearFields();
  }

  clearFields() {
    this.email = this.password = '';
  }
}
