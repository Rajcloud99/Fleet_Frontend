import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCardDetailViewComponent } from './material-card-detail-view.component';

describe('MaterialCardDetailViewComponent', () => {
  let component: MaterialCardDetailViewComponent;
  let fixture: ComponentFixture<MaterialCardDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialCardDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCardDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
