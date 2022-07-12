import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrUpsertComponent } from './gr-upsert.component';

describe('GrUpsertComponent', () => {
  let component: GrUpsertComponent;
  let fixture: ComponentFixture<GrUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
