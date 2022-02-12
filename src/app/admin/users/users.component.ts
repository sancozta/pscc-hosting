import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { FireCrud } from '../../shared/abstracts/fire-crud.abstract';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'mat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends FireCrud<User> implements OnInit {

  override object: User = new User();

  constructor(
    public override firebase: FirebaseService,
    public override utils: UtilsService,
    public override dialog: MatDialog,
    public override cdr: ChangeDetectorRef,
  ) {
    super(
      firebase,
      utils,
      dialog,
      cdr,
      'users'
    );
  }

  override reloadDataClear() {
    this.firebase.getDocsUsers().subscribe((list) => this.list = list);
    super.reloadDataClear();
  }

  isValid(user: User): boolean {
    return user != null && !!user.name && !!user.email;
  }
}
