import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsReportsComponent } from './gps-reports.component';

describe('GpsReportsComponent', () => {
  let component: GpsReportsComponent;
  let fixture: ComponentFixture<GpsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
