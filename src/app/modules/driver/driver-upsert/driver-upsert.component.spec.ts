import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverUpsertComponent } from './driver-upsert.component';

describe('DriverUpsertComponent', () => {
  let component: DriverUpsertComponent;
  let fixture: ComponentFixture<DriverUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
