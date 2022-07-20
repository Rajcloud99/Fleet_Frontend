import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibComponent } from './calib.component';

describe('CalibComponent', () => {
  let component: CalibComponent;
  let fixture: ComponentFixture<CalibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
