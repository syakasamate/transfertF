import { TestBed } from '@angular/core/testing';

import { ListeCompteService } from './liste-compte.service';

describe('ListeCompteService', () => {
  let service: ListeCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
