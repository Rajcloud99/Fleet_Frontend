import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyUpsertComponent } from './duty-upsert.component';

describe('DutyUpsertComponent', () => {
  let component: DutyUpsertComponent;
  let fixture: ComponentFixture<DutyUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
