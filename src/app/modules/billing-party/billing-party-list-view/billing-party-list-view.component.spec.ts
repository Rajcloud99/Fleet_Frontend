import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPartyListViewComponent } from './billing-party-list-view.component';

describe('BillingPartyListViewComponent', () => {
  let component: BillingPartyListViewComponent;
  let fixture: ComponentFixture<BillingPartyListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingPartyListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPartyListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
