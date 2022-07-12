import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListViewComponent } from './trip-list-view.component';

describe('TripListViewComponent', () => {
  let component: TripListViewComponent;
  let fixture: ComponentFixture<TripListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
