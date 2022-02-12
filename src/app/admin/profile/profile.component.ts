import { Component, OnInit, NgZone } from '@angular/core';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'mat-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading: boolean = true;
  user: User = new User();

  constructor(
    private firebase: FirebaseService,
    public utils: UtilsService,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.ngZone.run(() => this.reloadDataClear());
  }

  reloadDataClear() {
    if (this.firebase.data != null) {
      this.firebase.data.subscribe((data: any) => {
        if (data != null && !!data.uid) {
          this.user.uid = data.uid;
          this.user.email = data.email;
          this.user.verify = data.emailVerified;
          this.firebase.getDocUser(this.user.uid ?? '').subscribe((log: User | null) => {
            if (log != null) {
              this.user.name = log.name;
              this.user.cpf = log.cpf;
              this.user.phone = log.phone;
            }
            this.loading = false;
          }, (error) => {
            console.log(error);
            this.utils.snackBar('Error ao capturar dados do usuário!');
          });
        }
      }, (error) => {
        console.log(error);
        this.utils.snackBar('Error ao capturar dados do usuário SDK!');
      });
    }
  }

  save() {
    this.firebase.updateDoc('users', this.user.uid ?? '', this.user).then((data) => {
      this.utils.snackBar('Informações atualizadas com sucesso!');
      this.reloadDataClear();
    }).catch((error) => {
      console.log(error);
      this.utils.snackBar('Falha ao atualizar o informações do usuário!');
    });
  }
}
