import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrWithoutTripComponent } from './gr-without-trip.component';

describe('GrWithoutTripComponent', () => {
  let component: GrWithoutTripComponent;
  let fixture: ComponentFixture<GrWithoutTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrWithoutTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrWithoutTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
