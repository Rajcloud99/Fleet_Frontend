import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrPopupComponent } from './add-gr-popup.component';

describe('AddGrPopupComponent', () => {
  let component: AddGrPopupComponent;
  let fixture: ComponentFixture<AddGrPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
