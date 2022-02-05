import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropZoneUploadComponent } from './drop-zone-upload.component';

describe('DropZoneUploadComponent', () => {
  let component: DropZoneUploadComponent;
  let fixture: ComponentFixture<DropZoneUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DropZoneUploadComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropZoneUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
