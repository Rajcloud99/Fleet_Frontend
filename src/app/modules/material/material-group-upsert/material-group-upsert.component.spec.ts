import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGroupUpsertComponent } from './material-group-upsert.component';

describe('MaterialGroupUpsertComponent', () => {
  let component: MaterialGroupUpsertComponent;
  let fixture: ComponentFixture<MaterialGroupUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialGroupUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGroupUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
