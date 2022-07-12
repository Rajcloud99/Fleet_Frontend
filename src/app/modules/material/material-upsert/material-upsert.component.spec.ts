import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialUpsertComponent } from './material-upsert.component';

describe('MaterialUpsertComponent', () => {
  let component: MaterialUpsertComponent;
  let fixture: ComponentFixture<MaterialUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
