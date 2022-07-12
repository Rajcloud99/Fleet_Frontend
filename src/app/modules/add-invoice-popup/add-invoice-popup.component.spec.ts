import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoicePopupComponent } from './add-invoice-popup.component';

describe('AddInvoicePopupComponent', () => {
  let component: AddInvoicePopupComponent;
  let fixture: ComponentFixture<AddInvoicePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvoicePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvoicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
