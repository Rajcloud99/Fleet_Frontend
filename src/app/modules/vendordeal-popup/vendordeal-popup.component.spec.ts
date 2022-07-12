import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordealPopupComponent } from './vendordeal-popup.component';

describe('VendordealPopupComponent', () => {
  let component: VendordealPopupComponent;
  let fixture: ComponentFixture<VendordealPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendordealPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendordealPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
