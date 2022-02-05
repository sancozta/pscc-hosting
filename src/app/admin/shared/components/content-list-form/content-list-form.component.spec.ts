import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListFormComponent } from './content-list-form.component';

describe('ContentListFormComponent', () => {
  let component: ContentListFormComponent;
  let fixture: ComponentFixture<ContentListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentListFormComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
