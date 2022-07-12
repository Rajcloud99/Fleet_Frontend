import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPartyComponent } from './billing-party.component';

describe('BillingPartyComponent', () => {
  let component: BillingPartyComponent;
  let fixture: ComponentFixture<BillingPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
