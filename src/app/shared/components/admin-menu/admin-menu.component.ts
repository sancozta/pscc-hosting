import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { MenuModel } from './../../models/menu.model';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'mat-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  @Input() user: firebase.User | null = <firebase.User>{};
  @Input() items: MenuModel[] = [];

  @Output() signout: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private ngZone: NgZone,
    private router: Router,
    public utilsService: UtilsService,
  ) { }

  ngOnInit(): void { }

  navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

  getEmail(user: firebase.User | null): string {
    return user != null && user.email != null ? user.email : '';
  }

  getName(user: firebase.User | null): string {
    return user != null && user.displayName != null ? user.displayName : '';
  }

  getFisrtCharEmail(text: string): string {
    return this.utilsService.getFisrtCharEmail(text);
  }
}
