import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorListViewComponent } from './sensor-list-view.component';

describe('SensorListViewComponent', () => {
  let component: SensorListViewComponent;
  let fixture: ComponentFixture<SensorListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
