import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-list-form',
  templateUrl: './content-list-form.component.html',
  styleUrls: ['./content-list-form.component.scss']
})
export class ContentListFormComponent implements OnInit {

  @Input() enableForm: boolean;

  constructor() { }

  ngOnInit(): void { }
}
