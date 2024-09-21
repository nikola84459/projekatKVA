import { TestBed } from '@angular/core/testing';

import { MestaZaRelaksacijuPodaciService } from './mesta-za-relaksaciju-podaci.service';

describe('MestaZaRelaksacijuPodaciService', () => {
  let service: MestaZaRelaksacijuPodaciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MestaZaRelaksacijuPodaciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
