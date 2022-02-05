import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { ContentListFormComponent } from './components/content-list-form/content-list-form.component';
import { DropZoneUploadComponent } from './components/drop-zone-upload/drop-zone-upload.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { UploadTaskFileComponent } from './components/upload-task-file/upload-task-file.component';

import { LazyLoadImageHooks } from './hooks/lazy-load-image.hooks';
import { DropzoneDirective } from './directives/dropzone.directive';

@NgModule({
  declarations: [
    AdminMenuComponent,
    ContentListFormComponent,
    ModalContentComponent,
    DropZoneUploadComponent,
    UploadTaskFileComponent,
    DropzoneDirective,
  ],
  exports: [
    AdminMenuComponent,
    ContentListFormComponent,
    ModalContentComponent,
    DropZoneUploadComponent,
    UploadTaskFileComponent,
    DropzoneDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    LazyLoadImageModule,
  ],
  entryComponents: [
    ModalContentComponent,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
      },
    },
    {
      provide: LAZYLOAD_IMAGE_HOOKS,
      useClass: LazyLoadImageHooks,
    },
  ],
})
export class SharedModule { }
