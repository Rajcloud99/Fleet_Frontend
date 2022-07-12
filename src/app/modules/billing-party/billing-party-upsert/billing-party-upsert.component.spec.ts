import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPartyUpsertComponent } from './billing-party-upsert.component';

describe('BillingPartyUpsertComponent', () => {
  let component: BillingPartyUpsertComponent;
  let fixture: ComponentFixture<BillingPartyUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingPartyUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPartyUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
