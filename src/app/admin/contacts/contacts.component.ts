import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { Contact } from '../../shared/models/contact.model';

@Component({
  selector: 'mat-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contact: Contact = <Contact>{};
  loading: boolean = true;

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
  ) { }

  ngOnInit(): void {
    this.reloadDataClear();
  }

  reloadDataClear() {
    this.firebase.getDocContacts().subscribe((data) => {
      this.contact = data;
      this.loading = false;
    });
  }

  save() {
    this.firebase.updateDoc('info', 'contacts', this.contact).then((data) => {
      this.utils.snackBar('Informações de contato atualizadas com sucesso!');
      this.reloadDataClear();
    }).catch((error) => {
      this.utils.snackBar('Falha ao atualizar o informações de contato!');
    });
  }
}
