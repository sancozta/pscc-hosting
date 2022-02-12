import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogModel } from '../../models/dialog.model';

@Component({
  selector: 'mat-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel) { }

}
