import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { FireCrud } from '../../shared/abstracts/fire-crud.abstract';
import { Category } from '../../shared/models/category.model';
import { Product } from '../../shared/models/product.model';
import { ImgModel } from '../../shared/models/img.model';

@Component({
  selector: 'mat-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent extends FireCrud<Product> implements OnInit {

  override object: Product = <Product>{};
  categorys: Category[] = [];

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
      'products'
    );
  }

  override reloadDataClear() {
    this.firebase.getDocsProducts().subscribe((list) => this.list = list);
    this.firebase.getDocsCategorys().subscribe((categorys) => this.categorys = categorys);
    super.reloadDataClear();
  }

  isValid(product: Product): boolean {
    return (product != null && !!product.title && !!product.description);
  }

  updateImgs(images: ImgModel[]) {
    this.object.images = images;
    this.cdr.detectChanges();
  }
}
