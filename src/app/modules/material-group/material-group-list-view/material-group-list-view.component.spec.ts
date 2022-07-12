import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGroupListViewComponent } from './material-group-list-view.component';

describe('MaterialGroupListViewComponent', () => {
  let component: MaterialGroupListViewComponent;
  let fixture: ComponentFixture<MaterialGroupListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialGroupListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGroupListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
