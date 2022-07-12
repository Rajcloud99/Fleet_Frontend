import { TestBed } from '@angular/core/testing';

import { ObjToCsvService } from './obj-to-csv.service';

describe('ObjToCsvService', () => {
  let service: ObjToCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjToCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
