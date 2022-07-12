import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceUpsertComponent } from './geofence-upsert.component';

describe('GeofenceUpsertComponent', () => {
  let component: GeofenceUpsertComponent;
  let fixture: ComponentFixture<GeofenceUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeofenceUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
