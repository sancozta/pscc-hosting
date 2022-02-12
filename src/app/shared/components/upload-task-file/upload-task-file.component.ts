import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

import { ImgModel } from './../../models/img.model';

@Component({
  selector: 'upload-task-file',
  templateUrl: './upload-task-file.component.html',
  styleUrls: ['./upload-task-file.component.scss'],
})
export class UploadTaskFileComponent implements OnInit {

  @Input() file: File | null = null;

  @Output() finalize: EventEmitter<ImgModel> = new EventEmitter<ImgModel>();

  @Output() complete: EventEmitter<File | null> = new EventEmitter<File | null>();

  task: AngularFireUploadTask | undefined;

  percentage: number = 0;

  constructor(
    private storage: AngularFireStorage,
    private cdr: ChangeDetectorRef,
  ) {
    setInterval(() => this.cdr.markForCheck(), 50);
  }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    const path = `uploads/${Date.now()}.${this.file?.name.split('.').pop()}`;

    this.task = this.storage.upload(path, this.file);

    this.task.percentageChanges().subscribe((p) => {
      this.percentage = p != undefined ? p : 0;
    });

    this.task.then(async (data) => {
      const url = await data.ref.getDownloadURL();
      const img = { url: url, path: path };
      this.finalize.emit(img);
      this.complete.emit(this.file);
    });
  }
}
