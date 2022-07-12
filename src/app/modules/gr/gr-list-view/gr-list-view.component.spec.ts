import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrListViewComponent } from './gr-list-view.component';

describe('GrListViewComponent', () => {
  let component: GrListViewComponent;
  let fixture: ComponentFixture<GrListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
