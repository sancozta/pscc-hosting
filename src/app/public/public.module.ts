import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { PublicRoutingModule } from './public.routing.module';

import { PublicComponent } from './public.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';

import { FirebaseService } from './../admin/shared/services/firebase.service';
import { UtilsService } from './../admin/shared/services/utils.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PublicRoutingModule,
    SharedModule,
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    ContactsComponent,
  ],
  providers: [
    FirebaseService,
    UtilsService,
  ],
})
export class PublicModule { }
