import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailViewComponent } from './trip-detail-view.component';

describe('TripDetailViewComponent', () => {
  let component: TripDetailViewComponent;
  let fixture: ComponentFixture<TripDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
