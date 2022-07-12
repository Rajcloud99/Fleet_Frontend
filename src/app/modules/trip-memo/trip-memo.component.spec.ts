import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMemoComponent } from './trip-memo.component';

describe('TripMemoComponent', () => {
  let component: TripMemoComponent;
  let fixture: ComponentFixture<TripMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
