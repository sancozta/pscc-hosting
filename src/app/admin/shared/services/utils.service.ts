import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  snackBar(message: string) {
    this.snackbar.open(message, 'Fechar', {
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  getFisrtPartEmail(text: string): string {
    if (!text) {
      return ''
    }
    return text.split('@')[0];
  }

  getFisrtCharEmail(text: string): string {
    if (!text) {
      return ''
    }
    return text.substring(0, 1);
  }
}
