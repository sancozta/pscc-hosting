import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FirebaseService } from '../../shared/services/firebase.service';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  title: string;
  body: string;

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
    public http: HttpClient
  ) { }

  ngOnInit(): void { }

  sendAll() {
    if (this.title && this.body) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'key=...');

      this.http.post('https://fcm.googleapis.com/fcm/send', {
        notification: {
          title: this.title,
          body: this.body,
        },
        priority: 'high',
        data: {
          clickaction: 'FLUTTER_NOTIFICATION_CLICK'
        },
        to: 'topics/all'
      }, { headers }).subscribe(data => {
        console.log(data);
        if (data['success'] > 0) {
          this.utils.snackBar('A Menssagem foi enviada com sucesso!');
        } else {
          this.utils.snackBar('A Menssagem não foi enviada!');
        }
        this.title = '';
        this.body = '';
      });
    } else {
      this.utils.snackBar('É necessário informar título e message para envio.');
    }
  }
}
