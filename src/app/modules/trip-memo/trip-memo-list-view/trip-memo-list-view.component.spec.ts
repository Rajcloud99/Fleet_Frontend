import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMemoListViewComponent } from './trip-memo-list-view.component';

describe('TripMemoListViewComponent', () => {
  let component: TripMemoListViewComponent;
  let fixture: ComponentFixture<TripMemoListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripMemoListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripMemoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
