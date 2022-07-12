import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceListViewComponent } from './geofence-list-view.component';

describe('GeofenceListViewComponent', () => {
  let component: GeofenceListViewComponent;
  let fixture: ComponentFixture<GeofenceListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeofenceListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
