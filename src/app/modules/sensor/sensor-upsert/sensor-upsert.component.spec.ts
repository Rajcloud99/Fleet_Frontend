import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorUpsertComponent } from './sensor-upsert.component';

describe('SensorUpsertComponent', () => {
  let component: SensorUpsertComponent;
  let fixture: ComponentFixture<SensorUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
