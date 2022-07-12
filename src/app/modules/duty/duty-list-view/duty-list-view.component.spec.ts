import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyListViewComponent } from './duty-list-view.component';

describe('DutyListViewComponent', () => {
  let component: DutyListViewComponent;
  let fixture: ComponentFixture<DutyListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
