import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'mat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.loading = true;
    if(this.firebase.data != null) {
      console.log(`Dados de Login Entrou no IF`);
      this.firebase.data.subscribe((data) => {
        console.log(`Dados de Login:`, data);
        if (data) {
          this.router.navigate(['/admin/report']);
        } else {  
          this.loading = false;
        }
      });
    }
  }

  loginWithGoogle() {
    this.firebase.loginWithGoogle()
  }
}
