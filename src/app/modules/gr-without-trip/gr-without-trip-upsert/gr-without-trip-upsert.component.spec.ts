import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrWithoutTripUpsertComponent } from './gr-without-trip-upsert.component';

describe('GrWithoutTripUpsertComponent', () => {
  let component: GrWithoutTripUpsertComponent;
  let fixture: ComponentFixture<GrWithoutTripUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrWithoutTripUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrWithoutTripUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
