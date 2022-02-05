import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../admin/shared/services/firebase.service';

import { Category } from './../../../admin/shared/models/category.model';
import { Product } from './../../../admin/shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  category: Array<Category> = [];
  products: Array<Product> = [];

  dataBack: string = 'black';

  constructor(
    private firebase: FirebaseService,
  ) { }

  ngOnInit() {
    this.firebase.getDocsCategorys().subscribe((data) => this.category = data);
    this.firebase.getDocsProducts().subscribe((data) => this.products = data);
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  ngOnDestroy() {
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
