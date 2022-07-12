import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripGpsComponent } from './trip-gps.component';

describe('TripGpsComponent', () => {
  let component: TripGpsComponent;
  let fixture: ComponentFixture<TripGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
