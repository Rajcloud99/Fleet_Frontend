import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUpsertComponent } from './vehicle-upsert.component';

describe('VehicleUpsertComponent', () => {
  let component: VehicleUpsertComponent;
  let fixture: ComponentFixture<VehicleUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
