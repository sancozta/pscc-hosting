import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../shared/services/firebase.service';
import { Product } from 'src/app/admin/shared/models/product.model';
import { Category } from './../../shared/models/category.model';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  countProducts: number = 0;
  countCategorys: number = 0;
  countUsers: number = 0;

  constructor(
    private firebase: FirebaseService,
  ) { }

  ngOnInit(): void {
    this.firebase.getCountDocs(new Product().collection()).subscribe((count) => this.countProducts = count);
    this.firebase.getCountDocs(new Category().collection()).subscribe((count) => this.countCategorys = count);
    this.firebase.getCountDocs(new User().collection()).subscribe((count) => this.countUsers = count);
  }
}
