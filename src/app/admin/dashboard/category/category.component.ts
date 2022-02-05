import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { FireCrud } from '../../shared/abstracts/fire-crud.abstract';
import { Category } from './../../shared/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends FireCrud<Category> implements OnInit {

  object: Category = new Category();

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
    this.firebase.getDocsCategorys().subscribe((list) => this.list = list);
    super.reloadDataClear();
  }

  isValid(category: Category): boolean {
    return (category.title?.length > 0 && category.key?.length > 0);
  }
}
