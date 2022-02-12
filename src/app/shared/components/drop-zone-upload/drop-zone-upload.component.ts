import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { ImgModel } from './../../models/img.model';

@Component({
  selector: 'drop-zone-upload',
  templateUrl: './drop-zone-upload.component.html',
  styleUrls: ['./drop-zone-upload.component.scss']
})
export class DropZoneUploadComponent implements OnInit, OnChanges {

  @Input() uid: string | undefined = '';

  @Input() images: ImgModel[] | undefined = [];

  @Output() update: EventEmitter<ImgModel[]> = new EventEmitter<ImgModel[]>();

  files: File[] = [];
  isHovering: boolean = false;
  placeholder: string = 'https://via.placeholder.com/500x250?text=Carregando...';

  constructor(
    public cdr: ChangeDetectorRef,
  ) {
    setInterval(() => {
      this.cdr.markForCheck();
    }, 50);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && (changes['images'].currentValue === undefined || changes['images'].currentValue === null)) {
      this.images = [];
    }
    this.update.emit(this.images);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
    this.cdr.detectChanges();
  }

  onDrop(files: FileList) {
    if (files != null)
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file != null) {
          this.files.push(file);
        }
      }
    this.cdr.detectChanges();
  }

  onRemove(file: File | null) {
    if (file != null) {
      const i = this.files.indexOf(file);
      if (i !== -1) {
        this.files.splice(i, 1);
      }
      this.cdr.detectChanges();
    }
  }

  onAdd(file: ImgModel) {
    if (!!this.images) {
      if (this.images.indexOf(file) === -1) {
        this.images.push(file);
      }
      this.update.emit(this.images);
      this.cdr.detectChanges();
    }
  }

  remove(file: ImgModel) {
    if (!!this.images) {
      const i = this.images.indexOf(file);
      if (i !== -1) {
        this.images.splice(i, 1);
      }
      this.update.emit(this.images);
      this.cdr.detectChanges();
    }
  }
}
