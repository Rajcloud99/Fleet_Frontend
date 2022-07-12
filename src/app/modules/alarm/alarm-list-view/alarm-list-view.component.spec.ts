import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmListViewComponent } from './alarm-list-view.component';

describe('AlarmListViewComponent', () => {
  let component: AlarmListViewComponent;
  let fixture: ComponentFixture<AlarmListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
