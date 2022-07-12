import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrWithoutTripListViewComponent } from './gr-without-trip-list-view.component';

describe('GrWithoutTripListViewComponent', () => {
  let component: GrWithoutTripListViewComponent;
  let fixture: ComponentFixture<GrWithoutTripListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrWithoutTripListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrWithoutTripListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
