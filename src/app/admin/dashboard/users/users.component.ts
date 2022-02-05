import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { FireCrud } from '../../shared/abstracts/fire-crud.abstract';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends FireCrud<User> implements OnInit {

  object: User = new User();

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
    public dialog: MatDialog,
    public cdr: ChangeDetectorRef,
  ) {
    super(
      firebase,
      utils,
      dialog,
      cdr,
    );
  }

  reloadDataClear() {
    this.firebase.getDocsUsers().subscribe((list) => this.list = list);
    super.reloadDataClear();
  }

  isValid(user: User): boolean {
    return (user.name?.length > 0 && user.email?.length > 0);
  }
}
