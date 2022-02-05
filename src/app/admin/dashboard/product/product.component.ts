import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

import { FireCrud } from '../../shared/abstracts/fire-crud.abstract';
import { Category } from '../../shared/models/category.model';
import { Product } from '../../shared/models/product.model';
import { ImgModel } from '../../shared/models/img.model';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent extends FireCrud<Product> implements OnInit {

  object: Product = new Product();
  categorys: Category[] = [];

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
    this.firebase.getDocsProducts().subscribe((list) => this.list = list);
    this.firebase.getDocsCategorys().subscribe((categorys) => this.categorys = categorys);
    super.reloadDataClear();
  }

  isValid(product: Product): boolean {
    return (product.title?.length > 0 && product.description?.length > 0);
  }

  updateImgs(images: ImgModel[]) {
    this.object.images = images;
    this.cdr.detectChanges();
  }
}
