import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPartyDetailViewComponent } from './billing-party-detail-view.component';

describe('BillingPartyDetailViewComponent', () => {
  let component: BillingPartyDetailViewComponent;
  let fixture: ComponentFixture<BillingPartyDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingPartyDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPartyDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
