import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmUpsertComponent } from './alarm-upsert.component';

describe('AlarmUpsertComponent', () => {
  let component: AlarmUpsertComponent;
  let fixture: ComponentFixture<AlarmUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
