import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { FireCrud } from '../../shared/abstracts/fire-crud.abstract';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'mat-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends FireCrud<Category> implements OnInit {

  override object: Category = new Category();

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
      'categorys'
    );
  }

  override reloadDataClear() {
    this.firebase.getDocsCategorys().subscribe((list) => this.list = list);
    super.reloadDataClear();
  }

  isValid(category: Category): boolean {
    return category != null && !!category.title && !!category.key;
  }
}
