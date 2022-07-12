import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpsertComponent } from './vendor-upsert.component';

describe('VendorUpsertComponent', () => {
  let component: VendorUpsertComponent;
  let fixture: ComponentFixture<VendorUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
