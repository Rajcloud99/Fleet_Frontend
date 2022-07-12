import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkUpsertComponent } from './landmark-upsert.component';

describe('LandmarkUpsertComponent', () => {
  let component: LandmarkUpsertComponent;
  let fixture: ComponentFixture<LandmarkUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
