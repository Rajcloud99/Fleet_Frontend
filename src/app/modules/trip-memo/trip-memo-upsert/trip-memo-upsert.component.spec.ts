import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMemoUpsertComponent } from './trip-memo-upsert.component';

describe('TripMemoUpsertComponent', () => {
  let component: TripMemoUpsertComponent;
  let fixture: ComponentFixture<TripMemoUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripMemoUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripMemoUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
