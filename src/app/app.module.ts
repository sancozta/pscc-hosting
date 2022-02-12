import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

import { ContentListFormComponent } from './shared/components/content-list-form/content-list-form.component';
import { DropZoneUploadComponent } from './shared/components/drop-zone-upload/drop-zone-upload.component';
import { UploadTaskFileComponent } from './shared/components/upload-task-file/upload-task-file.component';
import { ModalContentComponent } from './shared/components/modal-content/modal-content.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { AdminMenuComponent } from './shared/components/admin-menu/admin-menu.component';
import { CategoryComponent } from './admin/category/category.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { ProductComponent } from './admin/product/product.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ReportComponent } from './admin/report/report.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from "./admin/users/users.component";
import { LoginComponent } from './admin/login/login.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ReportComponent,
    CategoryComponent,
    ProductComponent,
    UsersComponent,
    ProfileComponent,
    ContactsComponent,
    NotificationComponent,
    AdminMenuComponent,
    ContentListFormComponent,
    ModalContentComponent,
    DropZoneUploadComponent,
    UploadTaskFileComponent,
  ],
  entryComponents: [
    ModalContentComponent,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
