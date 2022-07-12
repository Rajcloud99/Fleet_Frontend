import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDetailViewComponent } from './branch-detail-view.component';

describe('BranchDetailViewComponent', () => {
  let component: BranchDetailViewComponent;
  let fixture: ComponentFixture<BranchDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
