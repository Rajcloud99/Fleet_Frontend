import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListViewComponent } from './driver-list-view.component';

describe('DriverListViewComponent', () => {
  let component: DriverListViewComponent;
  let fixture: ComponentFixture<DriverListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
