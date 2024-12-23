import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContactFormComponent } from './user-contact-form.component';

describe('UserContactFormComponent', () => {
  let component: UserContactFormComponent;
  let fixture: ComponentFixture<UserContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
