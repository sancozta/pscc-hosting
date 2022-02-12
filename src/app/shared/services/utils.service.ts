import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackbar: MatSnackBar,
    private title: Title,
    private meta: Meta,
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

  generateTags({ title = '', description = '', image = '' }) {
    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'og:url', content: `https://${environment.firebase.authDomain}` },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@sanlabz' },
    ]);
  }
}
