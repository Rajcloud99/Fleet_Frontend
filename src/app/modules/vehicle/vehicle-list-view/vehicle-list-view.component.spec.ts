import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListViewComponent } from './vehicle-list-view.component';

describe('VehicleListViewComponent', () => {
  let component: VehicleListViewComponent;
  let fixture: ComponentFixture<VehicleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
