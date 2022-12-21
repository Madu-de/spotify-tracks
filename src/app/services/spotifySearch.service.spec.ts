/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifySearchService } from './spotifySearch.service';

describe('Service: SpotifySearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifySearchService]
    });
  });

  it('should ...', inject([SpotifySearchService], (service: SpotifySearchService) => {
    expect(service).toBeTruthy();
  }));
});
