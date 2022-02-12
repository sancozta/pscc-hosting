import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../../shared/services/utils.service';

@Component({
  selector: 'mat-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
    this.utils.generateTags({
      title: 'Sanlabz - Projetos e Soluções',
      description: 'Projetos e Soluções de Sistemas Web e Mobile',
      image: ''
    });
  }
}
