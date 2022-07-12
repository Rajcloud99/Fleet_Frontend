import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpsertComponent } from './customer-upsert.component';

describe('CustomerUpsertComponent', () => {
  let component: CustomerUpsertComponent;
  let fixture: ComponentFixture<CustomerUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
