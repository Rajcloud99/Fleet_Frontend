import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerMemoComponent } from './broker-memo.component';

describe('BrokerMemoComponent', () => {
  let component: BrokerMemoComponent;
  let fixture: ComponentFixture<BrokerMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
