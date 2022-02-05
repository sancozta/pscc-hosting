import { Component, OnInit, NgZone } from '@angular/core';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading = true;
  user: User = new User();

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.ngZone.run(() => this.reloadDataClear());
  }

  reloadDataClear() {
    this.firebase.data.subscribe((data) => {
      this.user.uid = data.uid;
      this.user.email = data.email;
      this.user.verify = data.emailVerified;
      this.firebase.getDocUser(this.user.uid).subscribe((datau) => {
        this.user.name = datau.name;
        this.user.cpf = datau.cpf;
        this.user.phone = datau.phone;
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.utils.snackBar('Error ao capturar dados do usuário!');
      });
    }, (error) => {
      console.log(error);
      this.utils.snackBar('Error ao capturar dados do usuário SDK!');
    });
  }

  save() {
    this.firebase.updateDoc('users', this.user.uid, this.user).then((data) => {
      this.utils.snackBar('Informações atualizadas com sucesso!');
      this.reloadDataClear();
    }).catch((error) => {
      console.log(error);
      this.utils.snackBar('Falha ao atualizar o informações do usuário!');
    });
  }
}
