import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUpsertComponent } from './branch-upsert.component';

describe('BranchUpsertComponent', () => {
  let component: BranchUpsertComponent;
  let fixture: ComponentFixture<BranchUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
