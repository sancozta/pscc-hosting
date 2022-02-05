import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTaskFileComponent } from './upload-task-file.component';

describe('UploadTaskFileComponent', () => {
  let component: UploadTaskFileComponent;
  let fixture: ComponentFixture<UploadTaskFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadTaskFileComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTaskFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
