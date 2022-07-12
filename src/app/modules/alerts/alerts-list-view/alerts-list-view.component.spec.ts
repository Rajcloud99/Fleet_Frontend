import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsListViewComponent } from './alerts-list-view.component';

describe('AlertsListViewComponent', () => {
  let component: AlertsListViewComponent;
  let fixture: ComponentFixture<AlertsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
